import React from 'react';
import styles from './index.less';

const Select = ({ value, options, onChange }) => {
  return (
    <select className={styles.select} value={value} onChange={onChange}>
      {options.map((item, key) => {
        const optionProps = { key };
        if (value === item) {
          optionProps.value = item;
        }
        return (
          <option {...optionProps}> {item} </option>
        );
      })}
    </select>
  );
};

export default Select;
