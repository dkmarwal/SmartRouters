import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import ButtonDesign from "../../../components/Button";
import { saverowsearch } from "../../../redux/actions/saveindexAction";
import CircularProgress from "@mui/material/CircularProgress";
import StyledTable from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkills,
  fetchSkillsforExcel,
  fetchSearchSkills,
} from "../../../redux/actions/skills";
import AddIcon from "@mui/icons-material/Add";
import { deleteSkill } from "../../../redux/helpers/skills";
import ViewAuditTrail from "./ViewAuditTrail";
import styles from "./styles";
import { withRouter } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ViewDialog from "./../../../components/Dialogs";
import ConfirmDialog from "./../../../components/Dialogs/ConfirmDialog";
import RequestChip from "../../../components/RequestChip";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import DownloadIcon from "@mui/icons-material/Download";
import XLSX from "xlsx";
const Skills = withRouter(({ history }) => {
  const [OpenBox, SetOpenBox] = useState(false);
  const [getskillsafterDelete, setgetskillsafterDelete] = useState(false);
  const classes = styles();
  const [openTableRow, setOpenTableRow] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [selectedId, setSelectedId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    PageNum: 1,
    PageSize: 10,
  });
  // const handleClick = (event, id) => {
  //   setAnchorEl(event.currentTarget);
  //   setSelectedId(id);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const [openDeleteDialogFlag, setOpenDeleteDialogFlag] = useState(false);
  const [deleteDialogSuccess, setDeleteDialogSuccess] = useState(false);

  const [searched, setSearched] = useState("");

  const [isSavedLoader, setIsSavedLoader] = useState(false);
  const [action, setAction] = React.useState(false);
  // const [selectedActionIndex, setselectedActionIndex] = React.useState(1);
  const [openDialogFlag, setOpenDialogFlag] = useState(false);

  const [TotalPagesForSearch, setTotalPagesForSearch] = useState(0);
  const [TotalCountForSearch, setTotalCountForSearch] = useState(0);
  const [CurrentPageForSearch, setCurrentPageForSearch] = useState(1);
  const [PageSizeForSearch, setPageSizeForSearch] = useState(1);
  // const [loader, Setloader] = useState(false);
  const actionbyId = localStorage.getItem("actionby");
  const RoleFlag = localStorage.getItem("Role");
  const Permissions= localStorage.getItem("Permissions");
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const searchedData = useSelector(
    (state) => state.searchSelectedData.selectedsearchatatrow
  );
  const RowData = useSelector((state) => state.skills?.list?.data) || [];
  const { skills } = store;
  const selectedID = useSelector((state) => state.rowIdSelected.selectedrow);
  const rowValues = useSelector((state) => state?.skills?.list?.data);
  const rowmessage = useSelector((state) => state?.skills?.list?.message);
  const [rowSelected, setrowSelected] = useState(rowValues);
  const selectedRowID = useSelector((state) => state.rowIdSelected.selectedrow);
  const selectedRowskill = useSelector(
    (state) => state.rowISelected.selecteditrow
  );
  const deleteDialogOnconform = () => {
    setgetskillsafterDelete(!getskillsafterDelete);
    setDeleteDialogSuccess(false);
  };
  const deleteSuccess = () => {
    setIsSavedLoader(true);
    // setDeleteDialogSuccess(true)
    DeleteAfterSave();
    // setOpenDeleteDialogFlag(false);
  };

  useEffect(() => {
    getSkills(filters);

    //Below comment is to disable warning explicitly, since there is no other workaround.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getSkills(filters);

    //Below comment is to disable warning explicitly, since there is no other workaround.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getskillsafterDelete]);
  // useEffect(() => {
  //   const { skills } = store;
  //   if (skills.list.error) {
  //     alert(skills.list.message);
  //   }
  // }, [store]);

  // const classes = styles();
  // const open = Boolean(anchorEl);
  // const id = open ? `simple-popover-${anchorEl}` : undefined;

  const getSkills = (filters) => {
    setIsLoading(true);
    dispatch(fetchSkills(filters)).then(() => {
      setIsLoading(false);
    });
  };

  const handlePaginationChange = (newObj) => {
    setFilters(newObj);
    searched.length ? skillSearchOnPagination(newObj) : getSkills(newObj);
  };

  const handlePaginationForward = () => {
    const newPageNum = filters["PageNum"] + 1;
    const newObj = { PageNum: newPageNum, PageSize: filters["PageSize"] };
    handlePaginationChange(newObj);
  };

  const handlePaginationBackward = () => {
    const newPageNum = filters["PageNum"] - 1;
    const newObj = { PageNum: newPageNum, PageSize: filters["PageSize"] };
    handlePaginationChange(newObj);
  };

  const actionsarray = [
    {
      id: "edit",
      label: "Edit",
      isClickable: <ViewDialog />,
    },
    {
      id: "delete",
      label: "Delete",
      isClickable: true,
    },
    {
      id: "viewaudittrail",
      label: "View Audit Trail",
      isClickable: true,
    },
  ];
  
  let skillsPermissions=JSON.parse(Permissions)?.filter((value)=>{

    return value.PageName==="Skills"
})

let ActionNames=skillsPermissions.map((value)=>{
  return value.ActionName
})

  // const actions = !RoleFlag==="Manager"?actionsarray:actionsarray.filter((item) => item.id !== "edit");
  let actionss=ActionNames.includes("Delete")?actionsarray:actionsarray.filter((item) => item.id !== "delete");
  let actions=ActionNames.includes("Modify")?actionss:actionss.filter((item) => item.id !== "edit");
  
  const actionPopOpen = Boolean(action);
  const actionClick = (event) => {
    setAction(event.currentTarget);
  };

  // const [selectedRowID,setSelectedRowID] = useState("")

  const pushToEditSkills = (id) => {
    history.push(`/admin/editSkill/${id}`);
  };
  const actionItemClick = (event, index) => {
    // setselectedActionIndex(index);
    setAction(null);
    let value = event.target.innerText;
    switch (value) {
      case "View Audit Trail":
        return setOpenDialogFlag(true);
      case "Edit":
        return pushToEditSkills(selectedRowID);
      case "Delete":
        return setOpenDeleteDialogFlag(true);

      default:
        return "";
    }
  };

  const actionPopClose = () => {
    setAction(null);
  };

  // function Row(props) {
  //   const { row } = props;
  //   return (
  //     <>
  //       <IconButton
  //         aria-label="expand row"
  //         size="small"
  //         onClick={() => setOpenTableRow(!openTableRow)}
  //       >
  //         {openTableRow ? (
  //           <KeyboardArrowDownIcon />
  //         ) : (
  //           <KeyboardArrowRightIcon />
  //         )}
  //       </IconButton>
  //     </>
  //   );
  // }

  const columns = [
    {
      id: "collapsId",
      label: "1",
      textIndent: -50,
      width: "5%",
      maxWidth: "5%",
      //minWidth: 60,
      format: (value) => (
        <IconButton aria-label="expand row" size="small">
          {openTableRow ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
      ),
      isClickable: true,
    },
    {
      id: "Name",
      label: "Skill",
      //minWidth: "13%",
      maxWidth: "13%",
      width: "13%",
      isClickable: false,
    },
    {
      id: "Products",
      label: "Product & Services",
      //minWidth: 180,
      maxWidth: "10%",
      width: "10%",
      format: (products, i) => {
        const moreCount = products?.length > 1 ? +products?.length - 1 : "";
        return (
          <>
            <span className={classes.primaryColor}>
              {products.length == ""
                ? ""
                : products.length && products[0]["ProdName"]}
              {/* {products.length&&products[0]["ProdName"]} */}
            </span>
            <span className={classes.moreCount}>
              {products.length > 1 ? ` +${moreCount}` : null}
            </span>
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "BusinessLines",
      label: "Business Line / Customer Type",
      //minWidth: 180,
      maxWidth: "10%",
      width: "10%",
      format: (businessLineNames, i) => {
        const moreCount =
          businessLineNames?.length > 1 ? +businessLineNames?.length - 1 : "";
        return (
          <>
            <span className={classes.primaryColor}>
              {businessLineNames.length == ""
                ? ""
                : businessLineNames.length &&
                  businessLineNames[0]["BusinessLineName"]}
              {/* {businessLineNames.length&&businessLineNames[0]["BusinessLineName"]} */}
            </span>
            <span className={classes.moreCount}>
              {businessLineNames.length > 1 ? `\u00A0 +${moreCount}` : null}
            </span>
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "RequestTypes",
      label: "Request Type",
      //minWidth: 150,
      maxWidth: "10%",
      width: "10%",
      format: (requesttypes) => {
        const moreCount =
          requesttypes?.length > 1 ? +requesttypes?.length - 1 : "";
        return (
          <>
            <span className={classes.primaryColor}>
              {requesttypes.length == ""
                ? ""
                : requesttypes.length && requesttypes[0]["RequestTypeName"]}
              {/* {requesttypes.length && requesttypes[0]["RequestTypeName"]} */}
            </span>
            <span className={classes.moreCount}>
              {" "}
              {requesttypes.length > 1 ? ` \u00A0+${moreCount}` : null}
            </span>
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "CustomerTypes",
      label: "NAIC / SIC Mapping",
      //minWidth: 120,
      maxWidth: "10%",
      width: "10%",
      format: (customerTypes, i) => {
        const moreCount =
          customerTypes?.length > 1 ? +customerTypes?.length - 1 : "";
        return (
          <>
            <span className={classes.primaryColor}>
              {customerTypes.length == ""
                ? ""
                : customerTypes.length && customerTypes[0]["CustomerTypeName"]}
              {/* { customerTypes.length && customerTypes[0]["CustomerTypeName"]} */}
            </span>
            <span className={classes.moreCount}>
              {customerTypes.length > 1 ? ` \u00A0+${moreCount}` : null}
            </span>
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "ProductActions",
      label: "Product Action",
      //minWidth: 120,
      maxWidth: "10%",
      width: "10%",
      format: (productactions) => {
        const moreCount =
          productactions?.length > 1 ? +productactions?.length - 1 : "";
        return (
          <span style={{ display: "flex" }}>
            <RequestChip name={productactions[0]["ActionName"]} />
            <span className={classes.moreCount}>
              {" "}
              {productactions.length > 1 ? `\u00A0+${moreCount}` : null}
            </span>
          </span>
        );
      },
      isClickable: false,
    },
    {
      id: "PrimaryAgents",
      label: "Assigned Team Members (Primary & Secondary) ",
      //minWidth: 150,
      maxWidth: "10%",
      width: "10%",
      format: (agents, i) => {
        // const primaryAgentCount = {store}
        // const moreCount = agents?.length > 1 ? + agents?.length - 1 : '';
        const sumPrimarySecondary =
       searched.length
          ? 
          // searchedData[i]?.SecondaryAgents?.length
          searchedData[i]?.PrimaryAgents?.length +
          searchedData[i]?.SecondaryAgents?.length
          : 
          RowData[i]?.PrimaryAgents?.length +
          RowData[i]?.SecondaryAgents?.length;
          
        return <div>{sumPrimarySecondary} Team Members</div>;
      },
      isClickable: false,
    },
	{
		id: "ModifiedBy",
		label: "Last Modified By",
		minWidth: "10%",
		maxWidth: "10%",
		//width: 200,
		isClickable: false,
	  },
	  {
		id: "ModifiedDate",
		label: "Last Modified On",
		minWidth: "10%",
		maxWidth: "10%",
		//width: 200,
		isClickable: false,
	  },
    {
      id: "Id",
      label: "2",
      textIndent: -5000,
      maxWidth: "2%",
      width: "2%",
      align: "center",
      format: (value) => (
        <>
          <IconButton
            aria-label="more"
            //id="long-button"
            //aria-controls="long-menu"
            // aria-expanded={actionPopOpen ? action : undefined}
            aria-haspopup="true"
            onClick={actionClick}
            style={{ color: "#0C2174" }}
          >
            <MoreVertIcon />
          </IconButton>
        </>
      ),
      isClickable: false,
    },

  ];

  const columnsCollaps = [
    {
      id: "collapsId",
      label: "1",
      textIndent: -50,
      width: "5%",
      maxWidth: "5%",
      format: (value) => (
        <IconButton aria-label="expand row" size="small">
          {openTableRow ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
      ),
      isClickable: true,
      visibility:"hidden",
    
      //width: 60,
    },
    


    {
      id: "Description",
      label: "Skill Description",
      //width: 100,
      // width: "7.5%",
      // maxWidth: "7.5%",
      width: "13%",
      // width: "8%",
      maxWidth: "13%",
      //wordBreak:"break-all",
      format: (des, i) => {
        const description = searched.length
          ? searchedData[i]?.Description
          : RowData[i]?.Description;
        return (
          <>
            <div className={classes.memberHeading}>Description</div>
            {description}
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "Products",
      label: "Product & Services",
      //wordBreak:"break-all",
      //minWidth: 180,
      maxWidth: "10%",
      width: "10%",
      format: (products, i) => {
        return (
          <>
            {searched.length
              ? searchedData[i]?.Products.map((product) => (
                  <div
                    key={product["ProdName"]}
                    className={classes.proServices}
                  >
                    <div
                      key={product["ProdName"]}
                      className={classes.memberHeading}
                    >
                      {product["ProdName"]}
                    </div>
                    {product["Services"].map((service) => (
                      <div key={service["ServiceName"]}>
                        {service["ServiceName"]}
                      </div>
                    ))}
                  </div>
                ))
              : products &&
                products.map((product) => (
                  <div
                    key={product["ProdName"]}
                    className={classes.proServices}
                  >
                    <div
                      key={product["ProdName"]}
                      className={classes.memberHeading}
                    >
                      {product["ProdName"]}
                    </div>
                    {product["Services"].map((service) => (
                      <div key={service["ServiceName"]}>
                        {service["ServiceName"]}
                      </div>
                    ))}
                  </div>
                ))}
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "BusinessLines",
      label: "Business Line / Customer Type",
      //wordBreak:"break-all",
      //minWidth: 180,
      maxWidth: "10%",
      width: "10%",
      format: (businessLineNames, i) => {
        return (
          <>
            {searched.length
              ? searchedData[i]?.BusinessLines.map((businessLineName) => (
                  <>
                    {businessLineName["BusinessLineName"]}
                    <br />
                  </>
                ))
              : businessLineNames.map((businessLineName) => (
                  <>
                    {businessLineName["BusinessLineName"]}
                    <br />
                  </>
                ))}
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "RequestTypes",
      label: "Request Type",
      //wordBreak:"break-all",
      //minWidth: 150,
      maxWidth: "10%",
      width: "10%",
      format: (requesttypes, i) => {
        return (
          <>
            {searched.length
              ? searchedData[i]?.RequestTypes.map((RequestTypeName) => (
                  <>
                    {RequestTypeName["RequestTypeName"]}
                    <br />
                  </>
                ))
              : requesttypes.map((requesttype) => (
                  <>
                    {requesttype["RequestTypeName"]}
                    <br />
                  </>
                ))}
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "CustomerTypes",
      label: "NAIC / SIC Mapping",
      //wordBreak:"break-all",
      //minWidth: 120,
      maxWidth: "10%",
      width: "10%",
      format: (customerTypes, i) => {
        return (
          <>
            {searched.length
              ? searchedData[i]?.CustomerTypes.map((CustomerTypeName) => (
                  <>
                    {CustomerTypeName["CustomerTypeName"]}
                    <br />
                  </>
                ))
              : customerTypes.map((customerType) => (
                  <>
                    {customerType["CustomerTypeName"]}
                    <br />
                  </>
                ))}
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "ProductActions",
      label: "Product Action",
      //wordBreak:"break-all",
      //minWidth: 120,
      maxWidth: "10%",
      width: "10%",
      format: (productactions, i) => {
        return (
          <>
            {searched.length
              ? searchedData[i]?.ProductActions.map((productaction) => (
                  <span>
                    <RequestChip
                      name={productaction["ActionName"]}
                      classname={classes.requestChipPadding}
                    />
                  </span>
                ))
              : productactions.map((productaction) => (
                  <span>
                    <RequestChip
                      name={productaction["ActionName"]}
                      classname={classes.requestChipPadding}
                    />
                  </span>
                ))}
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "PrimaryAgents",
      label: "Assigned Team Members",
      //wordBreak:"break-all",
      //minWidth: 150,
      maxWidth: "10%",
      width: "10%",
      format: (agents, i) => {
        const sAgent = searched.length
          ? searchedData[i]?.SecondaryAgents?.length
          : RowData[i]?.SecondaryAgents?.length;
        return (
          <>
            {searched.length ? (
              <>
                <div className={classes.memberHeading}>Primary Team</div>
                {searchedData[i]?.PrimaryAgents.map((item) => {
                  return <div key={item["AgentName"]}>{item["AgentName"]}</div>;
                })}
                <br />

                {sAgent > 0 ? (
                  <div className={classes.memberHeading}>Secondary Team</div>
                ) : null}
                {searchedData[i]?.SecondaryAgents.map((item) => {
                  return <div key={item["AgentName"]}>{item["AgentName"]}</div>;
                })}
              </>
            ) : (
              <>
                <div className={classes.memberHeading}>Primary Team</div>
                {RowData[i]?.PrimaryAgents.map((item) => {
                  return <div key={item["AgentName"]}>{item["AgentName"]}</div>;
                })}
                <br />

                {sAgent > 0 ? (
                  <div className={classes.memberHeading}>Secondary Team</div>
                ) : null}
                {RowData[i]?.SecondaryAgents.map((item) => {
                  return <div key={item["AgentName"]}>{item["AgentName"]}</div>;
                })}
              </>
            )}
          </>
        );
      },
      isClickable: false,
    },
    {
      id: "ModifiedBy",
      label: "Last Modified By",
      //wordBreak:"break-all",
      // width: "6%",
      // maxWidth: "6%",
      width: "10%",
      maxWidth: "10%",
      //width: 60,
    },
    {
      id: "ModifiedDate",
      label: "Last Modified On",
      // width: "6%",
      // maxWidth: "6%",
      width: "10%",
      maxWidth: "10%",
      //width: 60,
    },
    {
      id: "",
      label: "",
      width: "2%",
    },
  ];

  useEffect(() => {
    setrowSelected(rowValues);
  }, [rowValues]);
  // setRowq([])
  // setRowq(rowValues)
  // useEffect(() => {
  //   setrowSelected([]);
  // }, [rowValues?.list?.message=="There is no records available."]);

  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  async function skillssearch(value) {
    let objNew = { PageNum: 1, PageSize: 10 };

    let newObj = !value.length
      ? { ...objNew, SearchName: value }
      : { ...filters, SearchName: value };

    const val = await fetchSearchSkills(newObj);

    const filteredData = await val();

    setrowSelected(filteredData.Data || []);
    dispatch(saverowsearch(filteredData.Data || []));
    setTotalPagesForSearch(filteredData.TotalPages);
    setTotalCountForSearch(filteredData.TotalCount);
    setCurrentPageForSearch(filteredData.CurrentPage);

    setPageSizeForSearch(filteredData.PageSize);
  }
  const skillSearchOnPagination = async (newobj) => {
    let newObj = { ...newobj, SearchName: searched };

    const val = await fetchSearchSkills(newObj);
    const filteredData = await val();

    setrowSelected(filteredData.Data || []);

    setTotalPagesForSearch(filteredData.TotalPages);
    setTotalCountForSearch(filteredData.TotalCount);
    setCurrentPageForSearch(filteredData.CurrentPage);

    setPageSizeForSearch(filteredData.PageSize);
  };
  const debounceMethod = useCallback(
    debounceFunction((nextValue) => skillssearch(nextValue), 1000),
    [skillssearch]
  );

  const DeleteAfterSave = () => {
    // setDeleteDialogSuccess(false)
    const payload = { id: selectedID, ActionBy: Number(actionbyId) };
    // Setloader(true);

    deleteSkill(payload).then((res) => {
      const flag = res["Success"];
      if (flag) {
        setOpenDeleteDialogFlag(false);
        setIsSavedLoader(false);
        setDeleteDialogSuccess(true);
        // Setloader(false);

        // history.push("/admin/skills")
        return;
      }
      // Setloader(false);
      alert("there was some error please try again !");
      // Setloading(false)
    });
  };
  function productsall(data) {
    let arr = [];
    for (let g = 0; g < data.Products.length; g++) {
      arr.push(data.Products[g].ProdName);
    }

    return arr;
  }
  function convertArraysToString(data, key) {
    let newArray = [];
    for (let i = 0; i < data.length; i++) {
      newArray.push(data[i][`${key}`]);
    }
    let joinedArray = newArray.join();
    return joinedArray;
  }
  function func1(data, i) {
    console.log('products',data,data.Products,data.Products.length)
    for (let q = 1; q < data.Products.length; q++) {
      console.log('products,data.Products[q].ProdName',data.Products[q].ProdName)
      //  data.Products[q].ProdName;
    }
  }
  function func2(data, i) {
    for (let q = 1; q < data.Products.length; q++) {
      return convertArraysToString(data.Products[q]?.Services, "ServiceName");
    }
  }

  const convertDataforExcel = (data) => {
    let newArray = [];

    for (let i = 0; i < data.length; i++) {
      newArray.push({
        Skill: data[i].Name,
        Description: data[i].Description,
        "Is Specialized": data[i].IsSpecialized ? "Specialized": "Non Specialized"
        ,
        // Products: {"p","o"},
        Product: data[i].Products.length ? data[i].Products[0].ProdName : "",

        // productsall(data[i])
        // .map((x)=>{
        //   console.log(x)
        //         return x
        //       })
        // :"",
        Services: data[i].Products.length
          ? convertArraysToString(data[i].Products[0]?.Services, "ServiceName")
          : "",
        "Business Lines / Customer Type": convertArraysToString(
          data[i].BusinessLines,
          "BusinessLineName"
        ),
        "Request Types": convertArraysToString(
          data[i].RequestTypes,
          "RequestTypeName"
        ),
        "NAIC / SIC Mapping": convertArraysToString(
          data[i].CustomerTypes,
          "CustomerTypeName"
        ),
        "Product Actions": convertArraysToString(
          data[i].ProductActions,
          "ActionName"
        ),
        "Primary  Team Members": convertArraysToString(
          data[i].PrimaryAgents,
          "AgentName"
        ),
        "Secondary  Team Members": convertArraysToString(
          data[i].SecondaryAgents,
          "AgentName"
        ),
        "Last Modified By":data[i].ModifiedBy,
        "Last Modified On":data[i].ModifiedDate,
      });
      // data[i].Products.length > 1&& console.log("ffff",  func1(data[i], i))
      data[i].Products.length > 1 &&
      data[i].Products.map((value,i)=>{
        i>=1&&
        newArray.push({
          Product: value.ProdName,
          Services:  convertArraysToString(value.Services, "ServiceName"),
        });
      })
     
        // newArray.push({
        //   Products: func1(data[i], i),
        //   // Services: func2(data[i], i),
        // });
      // data[i].Products.length>1&&  newArray.push({Services:func2(data[i],i)
      // });
    }
    // data[i].Products.length>1?func1(data[i],i):""

    return newArray;
  };
  const downloadExcel = () => {
    const payloadForExcel = { WithOutPagination: true };

    dispatch(fetchSkillsforExcel(payloadForExcel)).then((resp) => {
      let data = convertDataforExcel(resp.Data);
      console.log('data',data)
      const workSheet = XLSX.utils.json_to_sheet(data);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "SkillsData");
      //Buffer
      // let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
      //Binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      //Download
      XLSX.writeFile(workBook, "SkillsData.xlsx");
    });
  };
  return (
    <div>
      {(skills && skills.list && skills.list.isLoading) || isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {SetOpenBox && (
            <Menu
              id="lock-menu"
              anchorEl={action}
              open={actionPopOpen}
              onClose={actionPopClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
              style={{ boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {actions.map((action, index) => (
                <MenuItem
                  key={action}
                  onClick={(event) => actionItemClick(event, index)}
                >
                  {action.label}
                </MenuItem>
              ))}
            </Menu>
          )}
          {openDialogFlag === true && (
            <ViewDialog
              name="auditrail"
              title={"Audit Trail History"}
              message={<ViewAuditTrail pageData={filters} pageID={1} />}
              showCancelBtn={true}
              showOkBtn={false}
              setOpen={setOpenDialogFlag}
            />
          )}

          {openDeleteDialogFlag === true && (
            <ConfirmDialog
              name="delete"
              onConfirm={deleteSuccess}
              confirmText={"Delete"}
              title={`Are you sure to want to delete this ${selectedRowskill.Name} skill`}
              //message={`Do you really want to delete?`}
              //open={openDeleteDialogFlag}
              setOpen={setOpenDeleteDialogFlag}
              warningIcon={true}
              showCancelBtn={true}
              isLoading={isSavedLoader}
            />
          )}
          {deleteDialogSuccess === true && (
            <ConfirmDialog
              name="delete"
              onConfirm={deleteDialogOnconform}
              confirmText={"Okay"}
              title={"Deleted"}
              message={`${selectedRowskill.Name} deleted sucessfully!`}
              //open={openDeleteDialogFlag}
              setOpen={setOpenDialogFlag}
              warningIcon={true}
              showCancelBtn={false}
            />
          )}

          <div className={classes.topButton}>
          {ActionNames.includes("Extract")&&
       
             <span className={classes.exactLink}>
              <DownloadIcon />{" "}
              <span
                onClick={() => downloadExcel()}
                className={classes.exactText}
              >
                Extract Skills
              </span>
            </span>
           
          
            }
            <span className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  debounceMethod(e.target.value);
                  setSearched(e.target.value);
                }}
              />
            </span>
            {ActionNames.includes("Add")&&  <ButtonDesign
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => history.push("addSkills")}
              children={<span>Add New Skill</span>}
              style={{ fontSize: "14px" }}
            />}
          </div>

          <div className={classes.tabPanel}>
            <StyledTable
              // rows={skills && skills.list && skills.list.data}
              // rows={selrow.length<1?skills.list.data:selrow}
              rows={
                rowmessage == "There is no records available."
                  ? []
                  : rowSelected
              }
              columns={columns}
              pageNumber={
                searched.length
                  ? CurrentPageForSearch
                  : skills && skills.list && skills.list.currentPage
              }
              pageSize={
                searched.length
                  ? PageSizeForSearch
                  : skills && skills.list && skills.list.pageSize
              }
              totalCount={
                searched.length
                  ? TotalCountForSearch
                  : skills && skills.list && skills.list.totalCount
              }
              totalPages={
                searched.length
                  ? TotalPagesForSearch
                  : skills && skills.list && skills.list.totalPages
              }
              handlePaginationBackward={handlePaginationBackward}
              handlePaginationForward={handlePaginationForward}
              open={openTableRow}
              collapseData={columnsCollaps}
              name={"skills"}
              openBox={OpenBox}
              SetOpenBox={SetOpenBox}
            />
          </div>
        </>
      )}
    </div>
  );
});

export default Skills;
