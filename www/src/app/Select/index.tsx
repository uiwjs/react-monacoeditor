import React from 'react';
import styled from 'styled-components';
import { languageData } from '../App';

const SelectWrapper = styled.select`
  outline: none;
  height: 26px;
  line-height: 26px;
  padding-left: 15px;
  & + & {
    margin-left: 10px;
  }
`;

export type SelectProps = {
  options: typeof languageData;
  value: string;
  onChange: (evn: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ value, options, onChange }: SelectProps) => {
  return (
    <SelectWrapper value={value} onChange={onChange}>
      {options.map((item, key) => {
        const optionProps: React.OptionHTMLAttributes<HTMLOptionElement> = { };
        if (value === item) {
          optionProps.value = item;
        }
        return (
          <option {...optionProps} key={key}> {item} </option>
        );
      })}
    </SelectWrapper>
  );
};

export default Select;
