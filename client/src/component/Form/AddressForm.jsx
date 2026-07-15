import React from 'react'

const AddressForm = ({handleSubmit, value, setValue}) => {

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="addressName"
            placeholder="Enter New Address"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default AddressForm