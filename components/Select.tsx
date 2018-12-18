import * as React from "react";

interface Props {
  options: { value: string; label: string }[];
  value: string;
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
}

const Select: React.SFC<Props> = ({ options, value = "", onChange }) => (
  <label>
    <span className="mx-4 text-blue text-sm">Sort by</span>
    <select
      onChange={onChange}
      value={value}
      className="dropdown border border-grey h-12 text-sm leading-loose rounded-none relative pt-0 pb-0 pl-4 pr-4 appearance-none"
    >
      <option value="" />
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </label>
);

export default Select;
