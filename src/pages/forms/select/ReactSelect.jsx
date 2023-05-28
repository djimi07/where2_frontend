import React from "react";
import Select from "react-select";

const furits = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};
const ReactSelect = () => {
  return (
    <div className=" grid grid-cols-2 gap-5">

      <div>
        <label htmlFor=" hh2" className="form-label ">
          Clearable
        </label>
        <Select
          className="react-select"
          classNamePrefix="select"
          defaultValue={furits[1]}
          styles={styles}
          name="clear"
          options={furits}
          isClearable
          id="hh2"
        />
      </div>
     
    </div>
  );
};

export default ReactSelect;
