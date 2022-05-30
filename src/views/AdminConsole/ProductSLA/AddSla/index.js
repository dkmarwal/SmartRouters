import Select from "@mui/material/Select";
import { fetchAddSLA } from "../../../../redux/helpers/product";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import ButtonDesign from "./../../../../components/Button";
import TextFieldInput from "../../../../components/TextField";
import { TextField, Grid, Checkbox, MenuItem, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../../redux/actions/products";
import { fetchServicesByProductIds } from "../../../../redux/helpers/services";
import { fetchAllProductaction } from "./../../../../redux/actions/skills";
import { withRouter } from "react-router-dom";
import ConfirmDialog from "../../../../components/Dialogs/ConfirmDialog";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddSla = withRouter(({ history }) => {
  const classes = styles();
  // const [selectedproductId, setSelectedProductId] = useState("");
  const [formData, setFormData] = useState({
    productTypes: "",
    productAction: [],
    servicesTypes: [],
    impStandard: "",
    impCritical: "",
    impWorking: "",
    overStandard: "",
    overCritical: "",
  });
  const [selectAllIconFlag, SetselectAllIconFlag] = useState({
    businessLine: false,
    customerType: false,
    requestType: false,
    productTypes: false,
    servicesTypes: false,
    productAction: false,
    primaryTeamMember: false,
    secondaryTeamMember: false,
  });
  const actionbyId = localStorage.getItem("actionby");
  const [isLoading, setIsLoading] = useState(false);
  const [servicesByProductId, setServicesByProductId] = useState([]);
  // const [btnLoading, setBtnLoading] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [isSavedLoader, setIsSavedLoader] = useState(false);
  const [saveSuccessDialog, setSaveSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [flagForVaidateProductType, setFlagForVaidateProductType] =
    useState(false);
  const [flagForVaidateServiceType, setFlagForVaidateServiceType] =
    useState(false);
  const [flagForVaidateProductAction, setFlagForVaidateProductAction] =
    useState(false);
  const [flagForVaidateStandard, setFlagForVaidateStandard] = useState(false);
  // const [flagForVaidateCritical, setFlagForVaidateCritical] = useState(false);
  const [flagForVaidateWorkinghours, setFlagForVaidateWorkinghours] =
    useState(false);
  const [flagForVaidateOverallStandard, setFlagForVaidateOverallStandard] =
    useState(false);

  const {
    productTypes,
    productAction,
    servicesTypes,
    impStandard,
    impCritical,
    impWorking,
    overStandard,
    overCritical,
  } = formData;
  const store = useSelector((state) => state);
  const allProductActionData = useSelector(
    (state) => state.skills?.allProductActionLine.data
  );
  const {
    products: { allProducts },
    // business: allBusinessLine,
  } = store;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  function findSelectAllInData(value, Name = "Name") {
    let DataWithOnlyName = [];
    for (let i = 0; i < value.length; i++) {
      DataWithOnlyName.push(value[i]?.[Name]);
    }
    const Flag = DataWithOnlyName.includes("Select All");
    return Flag;
  }
  const convertArra2string = (array) => {
    const newarra = [];
    for (let i = 0; i < array.length; i++) {
      newarra.push(array[i].Id);
    }
    const newvalue = newarra.toString();

    return newvalue;
  };

  const dispatch = useDispatch();
  const getAllProducts = () => {
    setIsLoading(true);
    dispatch(fetchAllProducts()).then(() => {
      setIsLoading(false);
    });
  };
  const getServicesByProductIds = (id) => {
    let Id = id ? id : null;

    fetchServicesByProductIds({ productIds: `${Id}` }).then((res) => {
      if (res.Data?.length) {
        let services = res.Data[0].Services;

        setServicesByProductId(services);
      }
    });
  };

  const getProductActionLine = () => {
    setIsLoading(true);
    dispatch(fetchAllProductaction()).then(() => {
      setIsLoading(false);
    });
  };

  // function uniqBy(a, key) {
  //   var seen = {};
  //   return a.filter(function (item) {
  //     var k = key(item);
  //     return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  //   });
  // }
  // const filterByReference = (arr1, arr2) => {
  //   let res = [];
  //   res = arr1.filter((el) => {
  //     return !arr2.find((element) => {
  //       return element.ProdName === el.ProdName;
  //     });
  //   });
  //   return res;
  // };

  const setSelectedProductAction = (value) => {
    const flag = findSelectAllInData(value, "ActionName");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        productAction: !selectAllIconFlag.productAction,
      });
      if (allProductActionData.length === formData.productAction.length) {
        setFormData({ ...formData, productAction: [] });
      }
      setFormData({ ...formData, productAction: allProductActionData });
      return;
    }
    const filteredValue = value.filter((item) => {
      return item !== "Select All";
    });
    SetselectAllIconFlag({ ...selectAllIconFlag, productAction: false });
    setFormData({ ...formData, productAction: filteredValue });
  };
  const setSelectedServices = (value) => {
    const flag = findSelectAllInData(value, "ServiceName");

    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        servicesTypes: !selectAllIconFlag.servicesTypes,
      });

      if (servicesByProductId.length === formData.servicesTypes.length) {
        setFormData({ ...formData, servicesTypes: [] });
      }
      setFormData({ ...formData, servicesTypes: servicesByProductId });
      return;
    }
    const filteredValue = value.filter((item) => {
      return item.servicesTypes !== "Select All";
    });
    SetselectAllIconFlag({ ...selectAllIconFlag, servicesTypes: false });
    setFormData({ ...formData, servicesTypes: filteredValue });
  };

  const setFlagforIconProductAction = (value) => {
    const flag = findSelectAllInData(value, "ActionName");

    if (flag) {
      if (allProductActionData.length === formData.productAction.length) {
        setFormData({ ...formData, productAction: [] });
      }
    }
  };

  // setFormData({ ...formData, servicesTypes: updatedServiceTypes });
  const setFlagforServiceIcon = (value) => {
    const flag = findSelectAllInData(value, "ServiceName");
    if (flag) {
      if (servicesByProductId.length === formData.servicesTypes.length) {
        setFormData({ ...formData, servicesTypes: [] });
      }
    }
  };

  // const onDeleteProductActionChips = (Id) => () => {
  //   const updatedData =
  //     productAction && productAction.filter((p) => p.Id !== Id);
  //   setSelectedProductAction(updatedData);
  // };
  // const onDeleteServicesTypeChips = (Id) => () => {
  //   setSelectedServices(Id);
  // };

  // const store = useSelector((state) => state);
  // const [loading, setLoading] = useState(false);
  // const [product, setProduct] = React.useState([]);
  // const handleChange = (event) => {
  //   setProduct(event.target.value);
  // };
  const handleFormData = (e) => {
    const { name, value } = e.target;

    // validateForm();
    if (name === "impWorking") {
      if (value.length < 3) {
        let flag = isNumeric(value) || !value.length;
        let flagsecond = Number(value) > 0 || !value.length;
        let finalflag = flagsecond ? flag : false;
        finalflag && setFormData({ ...formData, [name]: value });
      }
      return;
    }
    // let flag = isNumeric(value) || !value.length;

    // let flagsecond = Number(value) > 0 || !value.length;
    // let finalflag = flagsecond ? flag : false;
    // finalflag && setFormData({ ...formData, [name]: value });
    let numbers = /^[0-9]*$/;
    //  let spaces=/^\s+$/;
    let finalflag
    if (value.match(numbers) ) {
      finalflag=true;
    } else {
      finalflag= false;
    }
    finalflag && setFormData({ ...formData, [name]: value });
  };
  // const isSaveButtonDisabled =
  // //productTypes.length > 0 &&
  // productAction.length > 0 &&
  // impStandard &&
  // impCritical &&
  // impWorking &&
  // overStandard &&
  // overCritical;

  const handleSave = () => {
    const {
      productTypes,
      productAction,
      impStandard,
      impCritical,
      impWorking,
      overStandard,
      overCritical,
      servicesTypes,
    } = formData;
    setIsLoading(true);
    //
    const payload = {
      Id: 0,
      Impl_StandardTime: (Number(overStandard)),
      Impl_CriticalPath: impCritical.length === 0 ? null : (Number(impCritical)),
      Overall_StandardTime: (Number(impStandard)),
      Overall_CriticalPath:
        overCritical.length === 0 ? null : (Number(overCritical)),
      WorkingHours: Number(impWorking),
      ProductActionIds: convertArra2string(productAction),
      ServiceIds: convertArra2string(servicesTypes),
      ProductId: Number(productTypes),
      // ProductId:,
      ActionBy: Number(actionbyId),
    };
    fetchAddSLA(payload).then((res) => {
      //setIsLoading(false);
      setIsSavedLoader(false);
      setSaveDialog(false);
      if (res && res["Success"]) {
        setSaveSuccessDialog(true);
        // setBtnLoading(false);
        //setBtnLoading(false);
        // HandleAfterSave();
        return;
      }
      //alert(`Error - ${res["Message"]}`);
      setErrormessage(res["Message"]);

      setErrorDialog(true);
    });
  };

  // const validateForm = () => {
  //   if (
  //     !formData ||
  //     !formData.impStandard ||
  //     formData.impStandard.trim() === ""
  //   ) {
  //     if (isNaN(formData.impStandard) || formData.impStandard.length != 9) {
  //     }
  //   }
  // };
  // const [selectedServices, setSelectedService] = useState([]);
  function HandleAfterSave() {
    history.push("/admin/productsla");
  }
  const handleCancel = () => {
    // HandleAfterSave()
    history.push("/admin/productsla");
  };
  const handleSaveDialog = () => {
    setSaveDialog(true);
  };

  const handleSaveSuccessDialog = () => {
    setIsSavedLoader(true);
    handleSave();
  };

  const errorDialogClose = () => {
    setErrorDialog(false);
  };

  function disableCheck() {
    let formDatas = { ...formData };
    delete formDatas.impCritical;
    delete formDatas.overCritical;
    const propertyValues = Object.values(formDatas);

    let flag = false;
    propertyValues.map((item) => {
      if (!item.length) {
        flag = true;
      }
      return flag;
    });

    return flag;
  }

  // const [flagForVaidateOverallCritical, setFlagForVaidateOverallCritical] =
  //   useState(false);
  const ValidateSlaboundary = (name) => {
    name === "productTypes" &&
      !productTypes.length &&
      setFlagForVaidateProductType(true);
    name === "servicesTypes" &&
      !servicesTypes.length &&
      setFlagForVaidateServiceType(true);
    name === "productAction" &&
      !productAction.length &&
      setFlagForVaidateProductAction(true);
    name === "impStandard" &&
      !impStandard.length &&
      setFlagForVaidateStandard(true);
    name === "impWorking" &&
      !impWorking.length &&
      setFlagForVaidateWorkinghours(true);
    name === "overStandard" &&
      !overStandard.length &&
      setFlagForVaidateOverallStandard(true);
  };
  const ValidateFocusSlaboundary = (name) => {
    name === "productTypes" && setFlagForVaidateProductType(false);
    name === "servicesTypes" && setFlagForVaidateServiceType(false);
    name === "productAction" && setFlagForVaidateProductAction(false);
    name === "impStandard" && setFlagForVaidateStandard(false);
    name === "impWorking" && setFlagForVaidateWorkinghours(false);
    name === "overStandard" && setFlagForVaidateOverallStandard(false);
  };
  const SelectPlaceholder = ({ children }) => {
    return <div className={classes.placeholder}>{children}</div>;
  };
  useEffect(() => {
    getServicesByProductIds(productTypes);
  }, [productTypes]);
  useEffect(() => {
    getProductActionLine();

    getAllProducts();
  }, []);
  useEffect(() => {
    getServicesByProductIds(productTypes);
  }, [productTypes]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Add SLA</h1>
        </Grid>
        <Grid item xs={9}>
          <lable className={classes.chipSelectHeading}>
            Product Type <span className={classes.star}>*</span>
          </lable>
          <Select
            className={classes.productOptions}
            id="demo-multiple-name"
            value={productTypes}
            // onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            onBlur={()=>ValidateSlaboundary("productTypes")}
            error={flagForVaidateProductType}
            onFocus={()=>ValidateFocusSlaboundary("productTypes")}
            MenuProps={MenuProps}
            //label="Select Product Type"
            onChange={(e, newValue) => {
              let value = e.target.value;
              setFormData({ ...formData, productTypes: `${value}` });
              servicesTypes.length &&
                setFormData({ ...formData, servicesTypes: [] });
            }}
            displayEmpty
            renderValue={
              // productTypes == "" && () => <SelectPlaceholder>Select Product Type</SelectPlaceholder>
              productTypes !== ""
                ? undefined
                : () => (
                    <SelectPlaceholder>Select Product Type</SelectPlaceholder>
                  )
            }
          >
            {allProducts?.data.map((productType) => (
              <MenuItem key={productType.Id} value={productType.Id}>
                {productType.ProdName}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={9}>
          <lable className={classes.chipSelectHeading}>
            Service Type <span className={classes.star}>*</span>
          </lable>
          <Autocomplete
            multiple
            limitTags={5}
            id="service-type"
            className={classes.chipSelect}
            options={
              (servicesByProductId.length && [
                { Id: 0, ServiceName: "Select All" },
                ...servicesByProductId,
              ]) ||
              []
            }
            disableCloseOnSelect
            loading={isLoading}
            value={servicesTypes || []}
            onChange={(e, newValue) => {
              setSelectedServices(newValue);
              // setSelectedProductId(newValue[0].Id)
              setFlagforServiceIcon(newValue);
            }}
            getOptionLabel={(option) => option.ServiceName}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={selected}
                  indeterminate={
                    option.ServiceName === "Select All" ? true : false
                  }
                  indeterminateIcon={
                    <IndeterminateCheckBoxIcon
                      color={selectAllIconFlag.servicesTypes ? "primary" : ""}
                    />
                  }
                  color="primary"
                />
                <div className={classes.checkboxLabel}>
                  {option.ServiceName}
                </div>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={servicesTypes.length ? "" : "Select Service Type"}
                className={classes.chipSelectInput}
                onBlur={()=>ValidateSlaboundary("servicesTypes")}
                onFocus={()=>ValidateFocusSlaboundary("servicesTypes")}
                error={flagForVaidateServiceType}
              />
            )}
          />
        </Grid>

        <Grid item xs={9}>
          <lable className={classes.chipSelectHeading}>
            Product Action <span className={classes.star}>*</span>
          </lable>
          <Autocomplete
            multiple
            limitTags={5}
            id="product-action"
            className={classes.chipSelect}
            options={
              [{ Id: 0, ActionName: "Select All" }, ...allProductActionData] ||
              []
            }
            disableCloseOnSelect
            loading={isLoading}
            value={productAction}
            onChange={(e, newValue) => {
              setSelectedProductAction(newValue);
              setFlagforIconProductAction(newValue);
            }}
            getOptionLabel={(option) => option.ActionName}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={selected}
                  indeterminate={
                    option.ActionName === "Select All" ? true : false
                  }
                  indeterminateIcon={
                    <IndeterminateCheckBoxIcon
                      color={selectAllIconFlag.productAction ? "primary" : ""}
                    />
                  }
                  color="primary"
                />
                <div className={classes.checkboxLabel}>{option.ActionName}</div>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={
                  productAction.length ? "" : "Select Product Action"
                }
                className={classes.chipSelectInput}
                onBlur={()=>ValidateSlaboundary("productAction")}
                error={flagForVaidateProductAction}
                onFocus={()=>ValidateFocusSlaboundary("productAction")}
              />
            )}
          />
        </Grid>
      </Grid>
      {/* End Grid */}
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <h2>Implementation</h2>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <lable className={classes.chipSelectHeading}>
            Standard Lead Time (In Days) <span className={classes.star}>*</span>
          </lable>

          <TextFieldInput
            placeholder="Enter the No of Days"
            value={impStandard}
            name="impStandard"
            onChange={handleFormData}
            margin="dense"
            onBlur={()=>ValidateSlaboundary("impStandard")}
            error={flagForVaidateStandard}
            onFocus={()=>ValidateFocusSlaboundary("impStandard")}
          />
        </Grid>
        <Grid item xs={3}>
          <lable className={classes.chipSelectHeading}>
            Critical Path (In Days)
          </lable>
          <TextFieldInput
            placeholder="Enter the No of Days"
            value={impCritical}
            name="impCritical"
            onChange={handleFormData}
            margin="dense"
          />
        </Grid>
        <Grid item xs={3}>
          <lable className={classes.chipSelectHeading}>
            Working Hours (In Hours) <span className={classes.star}>*</span>
          </lable>
          <TextFieldInput
            placeholder="Enter the No of Hours"
            value={impWorking}
            name="impWorking"
            onChange={handleFormData}
            margin="dense"
            onBlur={()=>ValidateSlaboundary("impWorking")}
            error={flagForVaidateWorkinghours}
            onFocus={()=>ValidateFocusSlaboundary("impWorking")}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <h3>Overall SLA</h3>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <lable className={classes.chipSelectHeading}>
            Standard Lead Time (In Days) <span className={classes.star}>*</span>
          </lable>
          <TextFieldInput
            placeholder="Enter the No of Days"
            value={overStandard}
            name="overStandard"
            onChange={handleFormData}
            margin="dense"
            onBlur={()=>ValidateSlaboundary("overStandard")}
            error={flagForVaidateOverallStandard}
            onFocus={()=>ValidateFocusSlaboundary("overStandard")}
          />
        </Grid>
        <Grid item xs={3}>
          <lable className={classes.chipSelectHeading}>
            Critical Path (In Days)
          </lable>
          <TextFieldInput
            placeholder="Enter the No of Days"
            value={overCritical}
            name="overCritical"
            onChange={handleFormData}
            margin="dense"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box mt={3}>
            <ButtonDesign
              variant="contained"
              color="primary"
              onClick={handleSaveDialog}
              style={{ fontSize: "16px" }}
              // disabled={!isSaveButtonDisabled}
              disabled={disableCheck()}
            >
              Save
            </ButtonDesign>
            &nbsp;&nbsp;&nbsp;
            <ButtonDesign
              variant="outlined"
              color="primary"
              onClick={() => handleCancel()}
              style={{ fontSize: "16px" }}
            >
              Cancel
            </ButtonDesign>
          </Box>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      {saveDialog && (
        <ConfirmDialog
          name="auditrail"
          title={"do you want to save this record?"}
          saveIcon={true}
          message={"Please check the information before submitting!"}
          saveText={"Save"}
          onSave={handleSaveSuccessDialog}
          showSaveBtn={true}
          isLoading={isSavedLoader}
          showCancelBtn={true}
          showOkBtn={false}
          setOpen={setSaveDialog}
          //onCancel={handleSaveCancel}
        />
      )}

      {saveSuccessDialog && (
        <ConfirmDialog
          name="auditrail"
          title={"Saved!"}
          successIcon={true}
          message={`SLA saved sucessfully!`}
          saveText={"Okay"}
          onSave={HandleAfterSave}
          showSaveBtn={true}
          showCancelBtn={false}
          showOkBtn={false}
          setOpen={setSaveDialog}
          //onCancel={handleSaveCancel}
        />
      )}

      {errorDialog === true && (
        <ConfirmDialog
          name="delete"
          onConfirm={errorDialogClose}
          confirmText={"Okay"}
          title={"Oops"}
          message={`You can't add the same product name.`}
          //open={openDeleteDialogFlag}
          //setOpen={setOpenDeleteDialogFlag}
          warningIcon={true}
          showCancelBtn={false}
        />
      )}
      {errorDialog === true && (
        <ConfirmDialog
          name="delete"
          onConfirm={errorDialogClose}
          confirmText={"Okay"}
          title={"Oops"}
          message={`${errormessage} `}
          //open={openDeleteDialogFlag}
          //setOpen={setOpenDeleteDialogFlag}
          warningIcon={true}
          showCancelBtn={false}
        />
      )}
    </div>
  );
});
export default AddSla;
