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
const id = localStorage.getItem("id");
console.log("Token", token)
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

const TablePageOwner = () => {
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        `https://where2llc.app/api/get_user_info`,
        config
      );
      console.log(response)
      setData(response.data.data);
    } else {
      dispatch(handleLogout(false));
    }
  };

  useEffect(() => {
    fetchProfile();
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
    console.log(e)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
       if (token) {
      const name = e.target.hi_Fullname.value;
      const phone = e.target.hi_phone.value;
      const address = e.target.hi_address.value;
      const zipCode = e.target.hi_zip.value;
      const country = e.target.hi_country.value;
      const state = e.target.hi_state.value;
      const city = e.target.hi_city.value;
      const rating = e.target.hi_rating.value;
         const config = {
           headers: { Authorization: `Bearer ${token}` },
         };
         try {
           const response = await axios.post(
             "https://where2llc.app/api/user_profile_update",
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
  fetchProfile(); 

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
      <Card title="My Profile" noborder>
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
                {console.log(Data)}
                {Data ? (
                  <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                    <tr key={1}>
                      <td className="table-td">
                        {Data.firstName} {Data.lastName}{" "}
                      </td>
                      <td className="table-td">{Data.userEmail}</td>
                      <td className="table-td ">{Data.userMobile}</td>
                      <td className="table-td ">
                        {" "}
                        {Data.userName ? Data.userName : "-"}
                      </td>
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
                                defaultValue={Data.userId}
                                // prepend={<Icon icon="heroicons-outline:user" />}
                                merged
                              />
                              <br />
                              <Textinput
                                label="user name"
                                id="hi_username"
                                type="text"
                                placeholder="User Name"
                                horizontal
                                defaultValue={Data.userName}
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
                                defaultValue={Data.firstName}
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
                                defaultValue={Data.lastName}
                                // prepend={<Icon icon="heroicons-outline:user" />}
                                merged
                              />
                              <br />
                              <Textinput
                                label="Email"
                                id="hi_email"
                                type="email"
                                defaultValue={Data.userEmail}
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
                                defaultValue={Data.userMobile}
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
                        </div>
                      </td>
                    </tr>
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

export default TablePageOwner;
