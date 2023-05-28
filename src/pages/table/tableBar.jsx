import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
const token = localStorage.getItem("token");
import { toast } from "react-toastify";
import Modal from "@/components/ui/Modal";
import axios from "axios";
import Textinput from "@/components/ui/Textinput";

import { DataItem } from "./DataItem";
const columns = [
  {
    label: "Bar Name",
    field: "Bar Name",
  },
  {
    label: "Bar Address",
    field: "Bar Address",
  },

  {
    label: "Bar Status",
    field: "Bar Status",
  },

  {
    label: "Bar Phone",
    field: "Bar Phone",
  },
  {
    label: "Image",
    field: "Image",
  },
  {
    label: "Action",
    field: "Action",
  }
];

const furits = [
  { value: "chocolate", label: "Owner 1" },
  { value: "strawberry", label: "Owner 2" },
  { value: "vanilla", label: "Owner 3" },
];

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const rows = tableData.slice(0, 7);
const TableBar = () => {
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState({});
  const [owner, setOwner] = useState(null);
  const [barText, setBarText] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [emojiInput, setEmojiInput] = useState('');
  const [assignOwner, setAssignOwner] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [colortype, setColorType] = useState("Black");
  const [fonttype, setFontType] = useState("14px");
  const [boldtype, setBoldType] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProfile = async () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        `https://where2llc.app/api/get_user_info`,
        config
      );
      setData(response.data.data.restaurants);
      setBarText(response.data.data.restaurants[0].description)
    } else {
      dispatch(handleLogout(false));
    }
  };

  const fetchBar = async () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.post(
          "https://where2llc.app/api/admin/owner/search-api-owner",
          {},
          config
        );

        setOwner(
          response.data.response.map((element) => {
            return {
              label: `${element.firstName} ${element.lastName}`,
              value: element.userId,
            };
          })
        );
        // setOwner(response.data.response)
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
  };

  useEffect(() => {
    fetchBar();
    fetchProfile();
  }, []);


  const handleImage = async (resId, row) => {
    // const payload = {
    //   imageUrl: selectedImage,
    //   restaurantId:resId
    // }
    // // const payload = Object.assign({}, row, {
    // //   imageUrl: selectedImage,
    // //   restaurantId:resId
    // // });
    // console.log("payload",payload);

    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      };
      const payload = Object.assign({}, row, {
        imageUrl: selectedImage,
        restaurantId: resId
      });
      console.log("payload", payload);
      try {
        const response = await axios.post(
          "https://where2llc.app/api/owner/Bar-restaurant/add_or_update",
          payload,
          config
        );

        console.log("response", response);
        if (assignOwner) {
          const response2 = await axios.post(
            "https://where2llc.app/api/admin/Bar-restaurant/add_update_assign_owner",
            {
              ownerId: assignOwner,
              restaurantId,
            },
            config
          );
        }

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
        // window.location.reload();
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
    // // setIsEdit(false);
  }


  const handleEdit = async (e, row) => {
    console.log("e," + e + "row", row);
    e.preventDefault();
    if (token) {
      const restaurantId = e.target.hi_userId.value;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      };
      const payload = Object.assign({}, row, {
        imageUrl: selectedImage,
        restaurantId
      });
      try {
        const response = await axios.post(
          "https://where2llc.app/api/owner/Bar-restaurant/add_or_update",
          payload,
          config
        );
        if (assignOwner) {
          const response2 = await axios.post(
            "https://where2llc.app/api/admin/Bar-restaurant/add_update_assign_owner",
            {
              ownerId: assignOwner,
              restaurantId,
            },
            config
          );
        }

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
  };

  return (
    <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
      <Card title="See Establishment" noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              {Data.length !== 0 ? (
                <div>
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

                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                      {Data.map((row, i) => (
                        <>
                          <tr key={i}>
                            <td className="table-td">{row.name}</td>
                            <td className="table-td">{row.address}</td>
                            <td className="table-td ">{row.status}</td>
                            <td className="table-td ">{row.phone}</td>
                            <td className="table-td ">
                              <img
                                src={row.imageUrl}
                                alt="Establishment Image"
                              ></img>
                            </td>
                            <td>
                              <div className="space-xy-5">

                                <Modal
                                  title="Edit"
                                  label="Edit"
                                  labelClass="btn-outline-success"
                                  uncontrol
                                >
                                  <form onSubmit={(e) => handleEdit(e, row)}>
                                    <Textinput
                                      label="Bar ID"
                                      id="hi_userId"
                                      type="text"
                                      placeholder="User ID"
                                      horizontal
                                      disabled
                                      defaultValue={row.restaurantId}
                                      // prepend={<Icon icon="heroicons-outline:user" />}
                                      merged
                                    />
                                    <br />
                                    <div className="xl:col-span-2 col-span-1">
                                      <label htmlFor=" hh2" className="form-label ">
                                        Update Image
                                      </label>
                                      <input
                                        type="file"
                                        name="myImage"
                                        onChange={(event) => {
                                          setSelectedImage(event.target.files[0]);
                                        }}
                                      />
                                    </div>
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
                          <tr style={{ border: "none" }}>
                            <td className="table-td" colSpan="5" >
                              <DataItem key={i} dataItem={row} />
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                  {/* <p style={{ padding: "20px" }}>
                    <b> Today at {Data[0].name}</b>
                    <br />
                    <i>{Data[0].description}</i>
                  </p> */}
                </div>
              ) : (
                <p style={{ textAlign: "center" }}> No Data to Show </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TableBar;
