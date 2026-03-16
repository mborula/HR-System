import React from 'react';

const Add_employee = () => {
  return (
        <form>
            <label for="fname">First name:</label>
            <input type="text" id="fname" name="fname"></input>
            <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname"></input>
        </form>
  );
};