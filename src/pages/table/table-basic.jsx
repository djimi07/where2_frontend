import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";
import Button from "@/components/ui/Button";
import axios from "axios";
import { handleLogout } from "@/pages/auth/common/store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/ui/Modal";
import InputGroup from "@/components/ui/InputGroup";
import Textinput from "@/components/ui/Textinput";
const token = localStorage.getItem("token");
import { toast } from "react-toastify";


const columns = [
  {
    label: "Full Name",
    field: "Full Name",
  },
  {
    label: "Email",
    field: "Email",
  },

  {
    label: "Phone",
    field: "Phone",
  },

  {
    label: "User Name",
    field: "User Name",
  },
  {
    label: "Actions",
    field: "Actions",
  },
];

// slice(0, 10) is used to limit the number of rows to 10
const rows = tableData.slice(0, 7);

const BasicTablePage = () => {
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const fetchOwners = async () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "https://where2llc.app/api/admin/owner/search-api-owner",
        {},
        config
      );
      console.log(response)
      setData(response.data.response);
      console.log(Data)
    } else {
      dispatch(handleLogout(false));
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleDelete = async (e) => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "https://where2llc.app/api/admin/owner/delete",
        { id: e.userId },
        config
      );
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      fetchOwners()
    } else {
      dispatch(handleLogout(false));
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    if (token) {
      const userName = e.target.hi_username.value;
      const userId = e.target.hi_userId.value;
      const firstName = e.target.hi_firstname.value;
      const lastName = e.target.hi_lastname.value;
      const userEmail = e.target.hi_email.value;
      const userMobile = e.target.hi_phone.value;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.post(
          "https://where2llc.app/api/admin/owner/owner_add_or_update",
          {
            userName,
            firstName,
            lastName,
            userEmail,
            userMobile,
            userId,
          },
          config
        );

        //  await axios.post(
        //    "https://15o8898ui4.execute-api.us-east-1.amazonaws.com/api/admin/owner/make_owner",
        //    {
        //      id: response.data.data.userId,
        //      // id: 15,
        //    },
        //    config
        //  );
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
        fetchOwners();
        window.location.reload();
      } catch (error) {
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
  }

  return (
    <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
      <Card title="See Owner" noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                {Data ? (
                  <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                    {Data.map((row, i) => (
                      <tr key={i}>
                        <td className="table-td">
                          {row.firstName + " " + row.lastName}
                        </td>
                        <td className="table-td">{row.userEmail}</td>
                        <td className="table-td ">{row.userMobile}</td>
                        <td className="table-td ">{row.userName}</td>
                        <td className="table-td ">
                          <div className="space-xy-5">
                            <Modal
                              title="Edit"
                              label="Edit"
                              labelClass="btn-outline-success"
                              uncontrol
                            >
                              <form onSubmit={handleEdit}>
                                <Textinput
                                  label="User ID"
                                  id="hi_userId"
                                  type="text"
                                  placeholder="User ID"
                                  horizontal
                                  disabled
                                  defaultValue={row.userId}
                                  // prepend={<Icon icon="heroicons-outline:user" />}
                                  merged
                                />
                                <br/>
                                <Textinput
                                  label="user name"
                                  id="hi_username"
                                  type="text"
                                  placeholder="User Name"
                                  horizontal
                                  defaultValue={row.userName}
                                  // prepend={<Icon icon="heroicons-outline:user" />}
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="first name"
                                  id="hi_firstname"
                                  type="text"
                                  placeholder="First Name"
                                  horizontal
                                  defaultValue={row.firstName}
                                  // prepend={<Icon icon="heroicons-outline:user" />}
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="last name"
                                  id="hi_lastname"
                                  type="text"
                                  placeholder="Last Name"
                                  horizontal
                                  defaultValue={row.lastName}
                                  // prepend={<Icon icon="heroicons-outline:user" />}
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="Email"
                                  id="hi_email"
                                  type="email"
                                  defaultValue={row.userEmail}
                                  placeholder="Type Owner's email"
                                  // prepend={<Icon icon="heroicons-outline:mail" />}
                                  horizontal
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="Phone"
                                  id="hi_phone"
                                  type="phone"
                                  defaultValue={row.userMobile}
                                  placeholder="Type Owner's phone"
                                  // prepend={<Icon icon="heroicons-outline:phone" />}
                                  horizontal
                                  merged
                                />
                                <br />
                                <div className="ml-[124px] space-y-4">
                                  <Button
                                    text="Submit"
                                    type="submit"
                                    className="btn-success"
                                  />
                                </div>
                              </form>
                            </Modal>
                            <Button
                              text="Delete"
                              className="btn-danger"
                              onClick={() => handleDelete(row)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  ""
                )}
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BasicTablePage;
