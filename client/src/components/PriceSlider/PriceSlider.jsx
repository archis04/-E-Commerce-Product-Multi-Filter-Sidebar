import "./PriceSlider.css";

function PriceSlider({ minLimit, maxLimit, min, max, onChange }) {
  const handleMinChange = (event) => {
    const nextMin = Number(event.target.value);
    onChange({
      min: Math.min(nextMin, max),
      max,
    });
  };

  const handleMaxChange = (event) => {
    const nextMax = Number(event.target.value);
    onChange({
      min,
      max: Math.max(nextMax, min),
    });
  };

  const formattedMin = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(min);

  const formattedMax = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(max);

  return (
    <fieldset className="filter-section">
      <legend className="filter-section-title">Price Range</legend>
      <p className="price-slider-values">
        {formattedMin} – {formattedMax}
      </p>
      <label className="price-slider-control">
        <span>Minimum</span>
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={min}
          onChange={handleMinChange}
        />
      </label>
      <label className="price-slider-control">
        <span>Maximum</span>
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={max}
          onChange={handleMaxChange}
        />
      </label>
    </fieldset>
  );
}

export default PriceSlider;
