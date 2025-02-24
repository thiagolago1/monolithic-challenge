function queryFilters(
  filters: Record<string, any> | undefined
): Record<string, any> {
  if (!filters) {
    return {};
  }
  return Object.keys(filters).reduce((acc, key) => {
    const value = filters[key];

    if (
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0) &&
      !(
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0
      )
    ) {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, any>);
}

export function formatQueryParams(
  filters: Record<string, any>,
  queryInicial: boolean = true
): string {
  const cleanedFilters = queryFilters(filters);
  const queryParams = new URLSearchParams(cleanedFilters).toString();

  if (!queryParams) {
    return "";
  }

  return queryInicial ? `?${queryParams}` : queryParams;
}
