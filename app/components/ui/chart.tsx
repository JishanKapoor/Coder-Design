"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type { TooltipProps, LegendProps } from "recharts";

import { cn } from "./utils";

// Fallback type for older Recharts versions
type TooltipPayload = {
  color?: string;
  name?: string;
  value?: number | string;
  dataKey?: string;
  payload?: Record<string, any>;
};

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = { config: ChartConfig };

const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

/* ---------------- Chart Container ---------------- */

export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

/* ---------------- Chart Style ---------------- */

export function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.theme || cfg.color,
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, cfg]) => {
    const color =
      cfg.theme?.[theme as keyof typeof cfg.theme] || cfg.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
}

/* ---------------- Tooltip ---------------- */

export const ChartTooltip = RechartsPrimitive.Tooltip;

interface ChartTooltipContentProps
  extends Omit<TooltipProps<number, string>, "content">,
    React.HTMLAttributes<HTMLDivElement> {
  payload?: {
    name?: string;
    value?: number | string;
    color?: string;
    dataKey?: string;
    payload?: Record<string, any>;
  }[];
  label?: string | number;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
}


export function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel) return null;
    const [item] = payload;
    const key = labelKey || item?.dataKey || item?.name || "value";
    const itemConfig = getPayloadConfig(config, item, key);

    const labelValue =
      typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
         {labelFormatter(labelValue, payload as any)}

        </div>
      );
    }

    return labelValue ? (
      <div className={cn("font-medium", labelClassName)}>{labelValue}</div>
    ) : null;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = nameKey || item.name || item.dataKey || "value";
          const itemConfig = getPayloadConfig(config, item, key);
          const indicatorColor = color || item.color;

          return (
            <div
              key={item.dataKey || index}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center",
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
               formatter(
  item.value as any,
  item.name ?? "",
  item as any,
  index,
  item.payload as any
)


              ) : (
                <>
                  {!hideIndicator && (
                    <div
                      className={cn(
                        "shrink-0 rounded-[2px]",
                        indicator === "dot" && "h-2.5 w-2.5",
                        indicator === "line" && "w-1 h-2.5",
                        indicator === "dashed" &&
                          "w-0 border-[1.5px] border-dashed bg-transparent h-2.5",
                      )}
                      style={{
                        backgroundColor: indicator === "dashed" ? "transparent" : indicatorColor,
                        borderColor: indicatorColor,
                      }}
                    />
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value !== undefined && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Legend ---------------- */

export const ChartLegend = RechartsPrimitive.Legend;

interface ChartLegendContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "translate" | "payload"> {
  /** Recharts legend items */
  payload?: {
    value?: string;
    color?: string;
    dataKey?: string;
  }[];
  /** Legend alignment */
  verticalAlign?: "top" | "middle" | "bottom";
  hideIcon?: boolean;
  nameKey?: string;
}


export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: ChartLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item, idx) => {
        const key = nameKey || item.dataKey || "value";
        const itemConfig = getPayloadConfig(config, item, key);

        return (
          <div
            key={idx}
            className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
          >
            {!hideIcon ? (
              itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              )
            ) : null}
            {itemConfig?.label || item.value}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function getPayloadConfig(
  config: ChartConfig,
  item: TooltipPayload,
  key: string,
) {
  if (!item) return undefined;
  const payloadObj = item.payload as Record<string, any> | undefined;
const value = (payloadObj && payloadObj[key]) || (item as any)[key];
return config[value as keyof typeof config] || config[key];

}
