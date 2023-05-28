import axios from 'axios';
import React, { useState } from 'react'
const token = localStorage.getItem("token");
import colorBtn from "../../assets/images/all-img/colorfull-btn.png";
import EmojiPicker from "emoji-picker-react";
import { SketchPicker } from "react-color";
import { toast } from "react-toastify";

export const DataItem = (props) => {
    const { dataItem: dataItmProp, key } = props;
    const [dataItem, setDataItem] = useState(dataItmProp);
    const [barText, setBarText] = useState(dataItem.description);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [emojiInput, setEmojiInput] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [colortype, setColorType] = useState(dataItem?.color);
    const [fonttype, setFontType] = useState(dataItem?.fontSize);
    const [boldtype, setBoldType] = useState(dataItem?.is_bold == "0" ? false : true);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedImage, setSelectedImage] = useState({});

    const handleSave = async () => {
        setIsEdit(false);
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "multipart/form-data",
                },
            };
            const payload = Object.assign({}, dataItem, {
                description: barText?.concat(emojiInput),
                is_bold: boldtype === true ? "1" : "0",
                color: colortype,
                fontSize: fonttype,
                imageUrl: selectedImage
            });
            try {
                const response = await axios.post(
                    "https://where2llc.app/api/owner/Bar-restaurant/add_or_update",
                    payload,
                    config
                );
                if (response) {
                    setDataItem(response?.data?.data);
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
    const onEmojiClick = (emojiObject) => {
        setEmojiInput(prevInput => prevInput + emojiObject.emoji);
        setPickerVisible(false)
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    marginBottom: '10px'
                }}
            >
                <div
                > <label htmlFor=" hh2" className="form-label "
                    style={{ paddingLeft: "20px" }}
                ><b> Today at {dataItem.name}</b> </label></div>
                <div
                >
                    <span style={{ marginLeft: "20px" }}>
                        <button onClick={() => setIsEdit(!isEdit)}
                            class="text-white h-9 bg-blue-500 px-4 rounded-lg ml-5"
                            style={{ backgroundColor: "#65a30d" }}
                        >Edit
                        </button>
                        {isEdit && (
                            <button onClick={handleSave}
                                class="text-white h-9 bg-blue-500 px-4 rounded-lg ml-5"
                                style={{ backgroundColor: "#65a30d" }}
                            >Save
                            </button>
                        )}
                    </span>
                </div>
            </div>

            {isEdit ? <div style={{ display: "flex", width: "100%", gap: "5px", paddingLeft: "20px", position: "relative" }}>
                <div style={{ display: "flex", width: "100%" }}>
                    <textarea
                        value={barText?.concat(emojiInput)}
                        className="input-group-control"
                        style={{
                            width: "640%",
                            minHeight: "93px",
                            fontSize: `${fonttype}`,
                            color: `${colortype}`,
                            fontWeight: boldtype === true ? "bold" : "",
                        }}
                        onChange={(e) => {
                            setBarText(e.target.value)
                            setEmojiInput('');
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
                    // right: '93px',
                    // top: '790px'
                    right: '10%',
                    top: '52%',
                }}>
                    {showPicker &&
                        <SketchPicker
                            color={colortype}
                            // style={{ position: "absolute" }}
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
                    onClick={() => { setShowPicker(!showPicker); setPickerVisible(false) }}
                >
                </button>
                <div>
                    <button
                        style={{
                            height: "37px",
                            borderRadius: "2px",
                            backgroundColor: "transparent",
                            color: "white",
                            fontSize: "25px"
                        }}
                        onClick={() => { setPickerVisible(!pickerVisible); setShowPicker(false); }}
                    >
                        😄
                    </button>
                    {pickerVisible && (
                        <div
                            style={{
                                // position: "absolute",
                                // zIndex: 1,
                                // marginLeft: "-360px",
                                // bottom: "0px",
                                position: 'absolute',
                                zIndex: '1',
                                bottom: '0px',
                                top: '52%',
                                left: '62%'
                            }}
                        >
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
            </div> : <i style={{
                paddingLeft: "20px",
                fontSize: `${fonttype}`,
                color: `${colortype}`,
                fontWeight: boldtype === true ? "bold" : ""
            }}> {dataItem.description}</i>}
        </div>
    )
}
