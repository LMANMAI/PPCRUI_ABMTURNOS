import React from "react";
import { Box, Text, Spinner, Kbd } from "@chakra-ui/react";
import FormFieldInput from "../Input";

type Suggestion = {
  label: string;
  lat: string;
  lon: string;
};

const BASE =
  "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&accept-language=es&countrycodes=ar&limit=6&dedupe=1";
const CITY = "Ituzaingó";
const STATE = "Buenos Aires";
const COUNTRY = "Argentina";

function formatLabel(item: any): string {
  const a = item.address || {};
  const street = [a.road, a.house_number].filter(Boolean).join(" ").trim();
  const city = a.city || a.town || a.village || a.suburb;
  const state = a.state;
  const country = a.country;
  const tail = [city, state, country].filter(Boolean).join(", ");
  return street
    ? tail
      ? `${street}, ${tail}`
      : street
    : item.display_name || "";
}

function parseResults(dataArr: any[], sn?: { street: string; number: string }) {
  const seen = new Set<string>();
  const seenLabel = new Set<string>();
  const out: Suggestion[] = [];
  for (const data of dataArr) {
    for (const it of (data as any[]) || []) {
      const key = `${it.lat}|${it.lon}|${it.display_name}`;
      if (seen.has(key)) continue;
      seen.add(key);

      let label = formatLabel(it);
      if (sn) {
        const [head, ...tail] = label.split(",");
        const hasNumber = /\b\d{1,6}\b/.test(head);
        const streetMatches = new RegExp(`^${sn.street}\\b`, "i").test(
          head.trim()
        );
        if (!hasNumber && streetMatches) {
          label = `${sn.street} ${sn.number}${
            tail.length ? `,${tail.join(",")}` : ""
          }`;
        }
      }
      const labelKey = label.toLowerCase().trim();
      if (seenLabel.has(labelKey)) continue;
      seenLabel.add(labelKey);

      out.push({
        label,
        lat: String(it.lat),
        lon: String(it.lon),
      });
    }
  }
  return out;
}

function splitStreetNumber(raw: string) {
  const m = raw
    .trim()
    .match(/^([\p{L}\p{M}\.'\s]+?)\s+(\d{1,6})(?:\s*[A-Z0-9\-]*)?$/iu);
  if (!m) return null;
  const street = m[1].trim();
  const number = m[2].trim();
  return { street, number };
}

function buildUrls(raw: string) {
  const urls: string[] = [];
  const sn = splitStreetNumber(raw);

  if (sn) {
    const structured =
      `${BASE}&street=${encodeURIComponent(`${sn.street} ${sn.number}`)}` +
      `&city=${encodeURIComponent(CITY)}` +
      `&state=${encodeURIComponent(STATE)}` +
      `&country=${encodeURIComponent(COUNTRY)}&postalcode=1714`;

    urls.push(structured);

    const freeform = `${BASE}&q=${encodeURIComponent(
      `${sn.street} ${sn.number}, ${CITY}, ${STATE}, ${COUNTRY}`
    )}`;
    urls.push(freeform);
  } else {
    const freeform = `${BASE}&q=${encodeURIComponent(
      `${raw}, ${CITY}, ${STATE}, ${COUNTRY}`
    )}`;
    urls.push(freeform);
  }
  return urls;
}

function useClickAway<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onAway: () => void
) {
  React.useEffect(() => {
    function handler(e: MouseEvent | TouchEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onAway();
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, onAway]);
}

export default function AddressAutocomplete({
  label = "Dirección",
  placeholder = "Ej: Holanda 2199",
  value,
  onChange,
  onSelect,
  required,
}: {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onSelect: (s: Suggestion) => void;
  required?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState<Suggestion[]>([]);
  const [highlight, setHighlight] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  const ref = React.useRef<HTMLDivElement | null>(null);
  useClickAway(ref, () => setOpen(false)); // ✅ usar el hook

  React.useEffect(() => {
    if (!value || value.trim().length < 3) {
      setItems([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const urls = buildUrls(value);
        const results = await Promise.all(
          urls.map(async (u) => {
            try {
              const r = await fetch(`${u}&email=contacto@ituzaingo.gob.ar`);
              if (!r.ok) return [];
              return r.json();
            } catch {
              return [];
            }
          })
        );
        const sn = splitStreetNumber(value) || undefined;
        const parsed = parseResults(results, sn);
        setItems(parsed);
        setOpen(parsed.length > 0);
        setHighlight(0);
      } catch {
        setError("No se pudieron obtener sugerencias.");
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [value]);

  function handleSelect(idx: number) {
    const s = items[idx];
    if (!s) return;
    onSelect(s);
    onChange(s.label);
    setOpen(false);
  }

  return (
    <Box position="relative" ref={ref}>
      <FormFieldInput
        required={required}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputProps={{
          autoComplete: "off",
          onFocus: () => value && value.length >= 3 && setOpen(true),
          onKeyDown: (e) => {
            if (!open || !items.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlight((h) => Math.min(h + 1, items.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlight((h) => Math.max(h - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              handleSelect(highlight);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          },
        }}
      />

      {loading && (
        <Text
          fontSize="sm"
          color="fg.muted"
          mt={1}
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Spinner size="xs" /> Buscando direcciones
        </Text>
      )}
      {error && (
        <Text fontSize="sm" color="red.500" mt={1}>
          {error}
        </Text>
      )}

      {open && items.length > 0 && (
        <Box
          as="ul"
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt="2"
          bg="white"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="lg"
          zIndex={10}
          maxH="260px"
          overflowY="auto"
          listStyleType="none"
          p="0"
        >
          {items.map((it, i) => {
            const [bold, ...rest] = it.label.split(",");
            return (
              <Box
                as="li"
                key={`${it.label}-${i}`}
                px="3"
                py="2"
                cursor="pointer"
                bg={i === highlight ? "gray.50" : "white"}
                _hover={{ bg: "gray.50" }}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(i)}
              >
                <Text title={it.label}>
                  <Box as="span" fontWeight="semibold">
                    {bold}
                  </Box>
                  {rest.length > 0 && <Box as="span">,{rest.join(",")}</Box>}
                </Text>
              </Box>
            );
          })}
          <Box
            px="3"
            py="2"
            borderTopWidth="1px"
            fontSize="xs"
            color="fg.muted"
          >
            Enter para seleccionar • <Kbd>↑</Kbd>/<Kbd>↓</Kbd> para navegar •{" "}
            <Kbd>Esc</Kbd> para cerrar
          </Box>
        </Box>
      )}
    </Box>
  );
}
