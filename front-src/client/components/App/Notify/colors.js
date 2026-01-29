const colors = {
  info: "bg-info-muted text-info border border-info",
  success: "bg-success-muted text-success border border-success",
  warning: "bg-warning-muted text-warning border border-warning",
  error: "bg-error-muted text-error border border-error",
};

const iconColors = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

export function color(type) {
  return colors[type] || colors.info;
}

export function iconColor(type) {
  return iconColors[type] || iconColors.info;
}
