import React from "react";

const { countries } = require("countries-list");

const ShippingForm = ({ values, handleValues, loading, handleSubmit }) => {
  const countriesList = Object.values(countries);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-group py-2 px-2">
        <div className="form-group mb-3">
          <label htmlFor="Address" className="h5 ms-1">
            Address
          </label>
          <input
            id="Address"
            type="text"
            className="form-control form-control-lg"
            required
            name="address"
            value={values.address}
            onChange={handleValues}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="City" className="h5 ms-1">
            City
          </label>
          <input
            id="City"
            type="text"
            className="form-control form-control-lg"
            required
            name="city"
            value={values.city}
            onChange={handleValues}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="PhoneNo" className="h5 ms-1">
            Phone No.
          </label>
          <input
            id="PhoneNo"
            type="tel"
            className="form-control form-control-lg"
            required
            name="phoneNo"
            value={values.phoneNo}
            onChange={handleValues}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="PostalCode" className="h5 ms-1">
            Postal Code
          </label>
          <input
            id="PostalCode"
            type="Number"
            className="form-control form-control-lg"
            required
            name="postalCode"
            value={values.postalCode}
            onChange={handleValues}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="State" className="h5 ms-1">
            State
          </label>
          <input
            id="State"
            type="text"
            className="form-control form-control-lg"
            required
            name="state"
            value={values.state}
            onChange={handleValues}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="Country" className="h5 ms-1">
            Country
          </label>
          <select
            id="Country"
            className="form-control form-control-lg"
            name="country"
            value={values.country}
            onChange={handleValues}
          >
            {countriesList &&
              countriesList.map((e) => (
                <option key={e.name} value={e.name}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <button
            disabled={loading}
            type="submit"
            className=" bg-warning form-control form-control-lg "
            onClick={handleSubmit}
          >
            Continue {loading && <SyncOutlined spin />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
