import React from 'react';
import styles from './index.module.less';
import { languageData } from '../App';

export type SelectProps = {
  options: typeof languageData;
  value: string;
  onChange: (evn: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ value, options, onChange }: SelectProps) => {
  return (
    <select className={styles.select} value={value} onChange={onChange}>
      {options.map((item, key) => {
        const optionProps: React.OptionHTMLAttributes<HTMLOptionElement> = { };
        if (value === item) {
          optionProps.value = item;
        }
        return (
          <option {...optionProps} key={key}> {item} </option>
        );
      })}
    </select>
  );
};

export default Select;
