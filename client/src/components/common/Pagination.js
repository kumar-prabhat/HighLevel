import { useEffect, useState } from "react";

const Pagination = (props) => {
  const { handleChange, total = 100, limit = 10, reset = false } = props;
  const [value, setValue] = useState(1);
  const handlePreviousPage = () => {
    if (value && value > 1) {
      setValue(parseInt(`${value}`, 10) - 1);
      handleChange(
        limit * (parseInt(`${value}`, 10) - 2),
        limit,
        parseInt(`${value}`, 10) - 1
      );
    }
  };
  const handleNextPage = () => {
    if (value && value < Math.ceil(total / limit)) {
      setValue(parseInt(`${value}`, 10) + 1);
      handleChange(
        limit * parseInt(`${value}`, 10),
        limit,
        parseInt(`${value}`, 10) + 1
      );
    }
  };
  const handleInputChange = (e) => {
    if (
      (e.target.value > 0 && e.target.value <= Math.ceil(total / limit)) ||
      e.target.value === ""
    ) {
      setValue(e.target.value);
      if (e.target.value !== "")
        handleChange(limit * (e.target.value - 1), limit, e.target.value);
    } else setValue(value);
  };

  useEffect(() => {
    if (reset) setValue(1);
    else setValue(value);
  }, []);

  return (
    <div className={"paginationContainer"}>
      <input
        id="filled-hidden-label-normal"
        type="number"
        value={value}
        onChange={handleInputChange}
      />
      <div className={"totalValue"}>
        <span className={"totalPage"}>of {Math.ceil(total / limit)}</span>
      </div>

      <div display="flex" className={"controls"}>
        <div className={"controlButtons"} onClick={handlePreviousPage}>
          Previous
        </div>
        <br />
        <div className={"controlButtons"} onClick={handleNextPage}>
          Next
        </div>
      </div>
    </div>
  );
};

export default Pagination;
