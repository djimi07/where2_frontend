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
    label: "Actions",
    field: "Actions",
  },
];

import Select from "react-select";
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

// slice(0, 10) is used to limit the number of rows to 10
const rows = tableData.slice(0, 7);
const BasicTablePage = () => {
  const [Data, setData] = useState([]);
  const [barText, setBarText] = useState('');
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState({});
  const [owner, setOwner] = useState(null);
  const [assignOwner, setAssignOwner] = useState(null);

  const fetchOwner = async () => {
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

  
  // let colortype = ""
  // let boldtype = false
  // let fonttype = ""
  const fetchBar = async () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "https://where2llc.app/api/admin/Bar-restaurant/search-api",
        {},
        config
      );
      setData(response.data.response);
    } else {
      dispatch(handleLogout(false));
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchBar()
  }, []);

  const handleDelete = async (e) => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "https://where2llc.app/api/admin/Bar-restaurant/delete",
        { id: e.restaurantId },
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
      fetchBar();
    } else {
      dispatch(handleLogout(false));
    }

  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (token) {
      const restaurantId = e.target.hi_userId.value;
      const name = e.target.hi_username.value;
      const phone = e.target.hi_phone.value;
      const address = e.target.hi_address.value;
      const zipCode = e.target.hi_zip.value;
      const country = e.target.hi_country.value;
      const state = e.target.hi_state.value;
      const city = e.target.hi_city.value;
      const rating = "null";
      const latitude = e.target.hi_lat.value;
      const longitude = e.target.hi_lng.value;
      // const description = e.target.hi_description.value;

      // const status = e.target.status.value;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      };
      try {
        const response = await axios.post(
          "https://where2llc.app/api/admin/Bar-restaurant/add_or_update",
          {
            restaurantId,
            name,
            phone,
            address,
            zipCode,
            country,
            state,
            city,
            rating,
            latitude,
            longitude,
            // description : barText,
            imageUrl: selectedImage,
          },
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
        // await axios.post(
        //   "https://where2llc.app/api/admin/Bar-restaurant/update_status",
        //   {
        //     id: restaurantId,
        //     status: "1",
        //   },
        //   config
        // );
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
        // fetchBar();
        window.location.reload()

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

  // Data.map((row, i) => 
  //   {colortype = row.color
  //   boldtype = row.is_bold
  //   fonttype = row.fontSize})

  return (
    <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
      <Card title="See Establishment" noborder>
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
                                <Textinput
                                  label="Bar Name"
                                  id="hi_username"
                                  type="text"
                                  placeholder="Bar Name"
                                  horizontal
                                  defaultValue={row.name}
                                  // prepend={<Icon icon="heroicons-outline:user" />}
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="Bar Phone"
                                  id="hi_phone"
                                  type="text"
                                  placeholder="Bar Phone"
                                  horizontal
                                  defaultValue={row.phone}
                                  // prepend={<Icon icon="heroicons-outline:user" />}
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="Bar Address"
                                  id="hi_address"
                                  type="text"
                                  placeholder="Bar Address"
                                  horizontal
                                  defaultValue={row.address}
                                  // prepend={<Icon icon="heroicons-outline:user" />}
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="Bar ZipCode"
                                  id="hi_zip"
                                  type="text"
                                  defaultValue={row.zipCode}
                                  placeholder="Bar ZipCode"
                                  // prepend={<Icon icon="heroicons-outline:mail" />}
                                  horizontal
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="Bar Country"
                                  id="hi_country"
                                  type="text"
                                  defaultValue={row.country}
                                  placeholder="Bar Country"
                                  // prepend={<Icon icon="heroicons-outline:phone" />}
                                  horizontal
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="Bar State"
                                  id="hi_state"
                                  type="text"
                                  defaultValue={row.state}
                                  placeholder="Bar State"
                                  // prepend={<Icon icon="heroicons-outline:phone" />}
                                  horizontal
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="Bar City"
                                  id="hi_city"
                                  type="text"
                                  defaultValue={row.city}
                                  placeholder="Bar City"
                                  // prepend={<Icon icon="heroicons-outline:phone" />}
                                  horizontal
                                  merged
                                />
                                <br />
                                {/* <div style={{ display: "flex", width: "100%" }}>
                                  <label htmlFor=" hh2" className="form-label ">
                                    Today @ bar
                                  </label>
                                  <input
                                    value={row.description}
                                    className="input-group-control"
                                    style={{
                                      width: "309%",
                                      fontSize: `${row.fontSize}`,
                                      color: `${row.color}`,
                                      fontWeight: row.is_bold === "1" ? "bold" : "",
                                      // fontSize: fonttype,
                                      // color: colortype,
                                      // fontWeight : boldtype === "true" ? "bold" : ""
                                    }}
                                    onChange={(e) => {
                                      setBarText(e.target.value)
                                      // setEmojiInput('')
                                    }}
                                    placeholder="Today @ bar"
                                    id="hi_description"
                                    horizontal
                                    merged
                                  />
                                </div>
                                <br /> */}
                                {/* <Textinput
                                  label="Bar Rating"
                                  id="hi_rating"
                                  type="text"
                                  defaultValue={row.rating}
                                  placeholder="Bar Rating"
                                  // prepend={<Icon icon="heroicons-outline:phone" />}
                                  horizontal
                                  merged
                                />
                                <br /> */}
                                <Textinput
                                  label="Latitude"
                                  id="hi_lat"
                                  type="text"
                                  defaultValue={row.latitude}
                                  placeholder="Latitude"
                                  // prepend={<Icon icon="heroicons-outline:phone" />}
                                  horizontal
                                  merged
                                />
                                <br />
                                <Textinput
                                  label="Longitude"
                                  id="hi_lng"
                                  type="text"
                                  defaultValue={row.longitude}
                                  placeholder="Longitude"
                                  // prepend={<Icon icon="heroicons-outline:phone" />}
                                  horizontal
                                  merged
                                />
                                <br />
                                <div>
                                  <label htmlFor=" hh2" className="form-label ">
                                    Select Owner
                                  </label>
                                  <Select
                                    className="react-select"
                                    classNamePrefix="select"
                                    defaultValue={owner?.find(x => x.value === row.ownerId)}
                                    // value={owner.value}
                                    styles={styles}
                                    name="clear"
                                    options={owner}
                                    isClearable
                                    id="hh2"
                                    onChange={(event) => {
                                      setAssignOwner(event.value);
                                    }}
                                  />
                                </div>
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
