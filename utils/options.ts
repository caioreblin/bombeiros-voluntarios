export type OptionItem = { label: string; value: string };
export type Option = string | OptionItem;

export const toOptions = (options: Option[]): OptionItem[] =>
  options.map((opt) => (typeof opt === 'string' ? { label: opt, value: opt } : opt));
