import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import InputGroup from "@/components/ui/InputGroup";
import Icon from "@/components/ui/Icon";
import Fileinput from "@/components/ui/Fileinput";
import DropZone from "@/pages/forms/file-input/DropZone.jsx";
const token = localStorage.getItem("token");
import { toast } from "react-toastify";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import SketchPicker from "react-color";
import colorBtn from "../assets/images/all-img/colorfull-btn.png";

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
const ChangelogPage = () => {
  const [selectedImage, setSelectedImage] = useState({});
  const [barText, setBarText] = useState('');
  const [owner, setOwner] = useState(null);
  const [assignOwner, setAssignOwner] = useState(null);
  const [colortype, setColorType] = useState("Black");
  const [fonttype, setFontType] = useState("14px");
  const [boldtype, setBoldType] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [emojiInput, setEmojiInput] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(0);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


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

  useEffect(() => {
    fetchOwner();
  }, []);

  const handleSubmit = async (e) => {
    const is_bold = boldtype === true ? "1" : "0"
    const color = colortype
    const fontSize = fonttype
    e.preventDefault();
    if (token) {
      const payload = {
        name,
        phone,
        address,
        zipCode,
        country,
        state,
        city,
        rating,
        // description: barText.concat(emojiInput),
        imageUrl: selectedImage,
        fontSize,
        color,
        is_bold,
        latitude,
        longitude
      }
      
      const ownerId = assignOwner

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      };
      try {
        console.log("Image/", selectedImage);

        const response = await axios.post(
          "https://where2llc.app/api/admin/Bar-restaurant/add_or_update",
          payload,
          config
        );
        const restaurantId = response.data.data.restaurantId;
        console.log("resId", restaurantId)
        console.log("Response", response);
        if (assignOwner) {
          const response2 = await axios.post(
            "https://where2llc.app/api/admin/Bar-restaurant/add_update_assign_owner",
            {
              ownerId,
              restaurantId,
            },
            config
          );
        }
        await axios.post(
          "https://where2llc.app/api/admin/Bar-restaurant/update_status",
          {
            id: restaurantId,
            status: "1"
          },
          config
        );

        //a4sm4tjc0a.execute-api.us-east-1.amazonaws.com/api/admin/Bar-restaurant/add_update_assign_owner
        https: toast.success(response.data.message, {
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

  const onEmojiClick = (emojiObject) => {
    setEmojiInput(prevInput => prevInput + emojiObject.emoji);
    setPickerVisible(false)
  };

  return (
    <div>
      <Card title="Add Establishment">
        <div className="space-y-4">
          <InputGroup
            label="Bar name"
            id="hi_Fullname"
            type="text"
            placeholder="Bar name"
            horizontal
            Required
            // prepend={<Icon icon="heroicons-outline:user" />}
            merged
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <br />
          <InputGroup
            label="Bar Phone"
            id="hi_phone"
            type="number"
            placeholder="Bar Phone"
            horizontal
            Required
            // prepend={<Icon icon="heroicons-outline:user" />}
            merged
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <br />
          <InputGroup
            label="Bar Address"
            id="hi_address"
            type="text"
            placeholder="Type Bar Address"
            // prepend={<Icon icon="heroicons-outline:mail" />}
            horizontal
            value={address}
            merged
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
          <br />
          <InputGroup
            label="Bar ZipCode"
            id="hi_zip"
            type="number"
            placeholder="Bar Zip"
            horizontal
            value={zipCode}
            Required
            // prepend={<Icon icon="heroicons-outline:user" />}
            merged
            onChange={(event) => {
              setZipCode(event.target.value);
            }}
          />
          <br />
          <InputGroup
            label="Bar Country"
            id="hi_country"
            type="text"
            placeholder="Bar Country"
            horizontal
            Required
            // prepend={<Icon icon="heroicons-outline:user" />}
            merged
            value={country}
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
          <br />
          <InputGroup
            label="Bar State"
            id="hi_state"
            type="text"
            placeholder="Bar State"
            horizontal
            Required
            value={state}
            // prepend={<Icon icon="heroicons-outline:user" />}
            merged
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
          <br />
          <InputGroup
            label="Bar City"
            id="hi_city"
            type="text"
            placeholder="Bar City"
            horizontal
            Required
            value={city}
            // prepend={<Icon icon="heroicons-outline:user" />}
            merged
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <br />
          <Textinput
            label="Latitude"
            id="hi_lat"
            type="number"
            value={latitude}
            placeholder="Latitude"
            // prepend={<Icon icon="heroicons-outline:phone" />}
            horizontal
            merged
            onChange={(event) => {
              setLatitude(event.target.value);
            }}
          />
          <br />
          <Textinput
            label="Longitude"
            id="hi_lng"
            type="number"
            value={longitude}
            placeholder="Longitude"
            // prepend={<Icon icon="heroicons-outline:phone" />}
            horizontal
            merged
            onChange={(event) => {
              setLongitude(event.target.value);
            }}
          />
          <br />
          {/* <div style={{ display: "flex", width: "100%", gap: "5px" }}>
            <div style={{ display: "flex", width: "100%" }}>
              <label htmlFor=" hh2" className="form-label ">
                Today @ Bar
              </label>
              <input
                value={barText.concat(emojiInput)}
                className="input-group-control"
                style={{
                  width: "640%",
                  height: "37px",
                  fontSize: `${fonttype}`,
                  color: `${colortype}`,
                  fontWeight: boldtype === true ? "bold" : "",
                }}
                onChange={(e) => {
                  setBarText(e.target.value)
                  // setEmojiInput('')
                }}
                placeholder="Today @ Bar"
                id="hi_description"
              />
            </div>
            <button
              style={{
                height: "37px",
                borderRadius: "2px",
                backgroundColor: "#5dba50",
                paddingInline: "12px",
                color: "white",
              }}
              onClick={() => {
                setBoldType(!boldtype);
              }}
            >
              B
            </button>
            <div style={{
              position: 'absolute',
              zIndex: '1',
              right: '93px',
              top: '790px'
            }}>
              {showPicker &&
                <SketchPicker
                  color={colortype}
                  style={{ position: "absolute" }}
                  onChange={(color) => setColorType(color.hex)}
                />
              }
            </div>
            <div >
              <select
                name="fontSize"
                onChange={(e) => {
                  setFontType(e.target.value);
                }}
                style={{
                  outline: "none",
                  background: "#5dba50",
                  borderRadius: "4px",
                  height: "37px",
                  color: "white",
                  paddingInlineStart: "4px",
                }}
              >
                <option value="12px">12</option>
                <option value="13px">13</option>
                <option selected value="14px">
                  14
                </option>
                <option value="15px">15</option>
                <option value="16px">16</option>
                <option value="17px">17</option>
                <option value="18px">18</option>
              </select>
            </div>
            <button
              style={{
                height: "37px",
                borderRadius: "2px",
                width: "30px",
                paddingInline: "12px",
                backgroundImage: `url(${colorBtn})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              backgroundImage="url('../assets/images/all-img/colorfull-btn.png')"
              onClick={() => {setShowPicker(!showPicker); setPickerVisible(false) }}
            >
            </button>
            <div>
              <button
                style={{
                  height: "37px",
                  borderRadius: "2px",
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize:"25px"
                }}
                onClick={() => {setPickerVisible(!pickerVisible); setShowPicker(false);}}
              >
                😄
              </button>

              {pickerVisible && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    marginLeft: "-360px",
                    bottom: "0px",
                  }}
                >
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div> */}
          <br />
          {/* <InputGroup
            label="Bar Rating"
            id="hi_rating"
            type="number"
            placeholder="Bar Rating"
            horizontal
            Required
            value={rating}
            // prepend={<Icon icon="heroicons-outline:user" />}
            merged
            onChange={(event) => {
              setRating(event.target.value);
            }}
          />
          <br /> */}
          <div>
            <label htmlFor=" hh2" className="form-label ">
              Select Owner
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              styles={styles}
              name="clear"
              options={owner}
              isClearable
              id="hh2"
              onChange={(event) => {
                console.log(event);
                setAssignOwner(event.value);
              }}
            />
          </div>
          <br />
          <div className="xl:col-span-2 col-span-1">
            <label htmlFor=" hh2" className="form-label">
              Upload Image
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
          <div
            className="ml-[124px] space-y-4"
            style={{ backGroundColor: "#5dba50" }}
          >
            <Button
              text="Submit"
              className="btn-success"
              onClick={handleSubmit}
              style={{ backGroundColor: "#5dba50" }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChangelogPage;
