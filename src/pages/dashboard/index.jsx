import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import InputGroup from "@/components/ui/InputGroup";
import Icon from "@/components/ui/Icon";
import axios from "axios";
const token = localStorage.getItem("token");
import { toast } from "react-toastify";
import Select from "react-select";
import Flatpickr from "react-flatpickr";


const Dashboard = () => {
  const [assignOwner, setAssignOwner] = useState("null");
  const [picker, setPicker] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      const userName = e.target.hi_username.value;
      const firstName = e.target.hi_firstname.value;
      const lastName = e.target.hi_lastname.value;
      const userEmail = e.target.hi_email.value;
      const userMobile = e.target.hi_phone.value;
      const password = e.target.hi_password.value;
      const confirmPassword = e.target.hi_confirm_password.value;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.post(
          "https://where2llc.app/api/signup",
          {
            userName,
            firstName,
            lastName,
            userEmail,
            userMobile,
            password,
            confirmPassword,
            gender: "null",
            dateOfBirth: "null",
          },
          config
        );

        await axios.post(
          "https://where2llc.app/api/admin/owner/make_owner",
          {
            id: response.data.data.userId,
          },
          config
        );

        e.target.hi_username.value = "";
        e.target.hi_firstname.value = "";
        e.target.hi_lastname.value = "";
        e.target.hi_email.value = "";
        e.target.hi_phone.value = "";
        e.target.hi_password.value = "";
        e.target.hi_confirm_password.value = "";
        setAssignOwner(null)
        setPicker()
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        // if(error.response.data.message=="The gender field is required."){return;}

        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      dispatch(handleLogout(false));
    }
  };


  const furits = [
    { value: "Male", label: "Male " },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  return (
    <div>
      <Card title="Add Owner">
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <InputGroup
              label="user name"
              id="hi_username"
              type="text"
              placeholder="User Name"
              horizontal
              // prepend={<Icon icon="heroicons-outline:user" />}
              merged
            />
            <br />
            <InputGroup
              label="first name"
              id="hi_firstname"
              type="text"
              placeholder="First Name"
              horizontal
              // prepend={<Icon icon="heroicons-outline:user" />}
              merged
            />
            <br />
            <InputGroup
              label="last name"
              id="hi_lastname"
              type="text"
              placeholder="Last Name"
              horizontal
              // prepend={<Icon icon="heroicons-outline:user" />}
              merged
            />
            <br />
            <InputGroup
              label="Email"
              id="hi_email"
              type="email"
              placeholder="Type Owner's email"
              // prepend={<Icon icon="heroicons-outline:mail" />}
              horizontal
              merged
            />
            <br />
            <InputGroup
              label="Phone"
              id="hi_phone"
              type="phone"
              placeholder="Type Owner's phone"
              // prepend={<Icon icon="heroicons-outline:phone" />}
              horizontal
              merged
            />
            <br />
            
            {/* <label htmlFor=" hh2" className="form-label ">
              Gender
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              styles={styles}
              name="clear"
              options={furits}
              isClearable
              merged
              id="hh2"
              onChange={(event) => {
                setAssignOwner(event.label);
              }}
            />
            <br />
            <label htmlFor="default-picker" className=" form-label">
              Date of Birth
            </label>

            <Flatpickr
              className="form-control py-2"
              value={picker}
              onChange={(date) => setPicker(date)}
              id="default-picker"
            />
            <br /> */}
            <InputGroup
              label="Password"
              id="hi_password"
              type="Password"
              placeholder="Password"
              // prepend={<Icon icon="heroicons-outline:lock-closed" />}
              horizontal
              merged
            />
            <br />
            <InputGroup
              label="confirmPassword"
              id="hi_confirm_password"
              type="Password"
              placeholder="Confirm Password"
              // prepend={<Icon icon="heroicons-outline:lock-closed" />}
              horizontal
              merged
            />
            <br />
            <div className="ml-[124px] space-y-4">
              <Button text="Submit" type="submit" className="btn-success" />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
