import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import Box from "@mui/material/Box";
import ChatIcon from "@mui/icons-material/Chat";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Grid,
  Button,
  Chip,
  Popover,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  FormGroup,
  FormLabel,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { fetchAllProducts } from "../../redux/actions/products";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import DashboardCard from "../../components/Card";
import StyledTable from "../../components/Table";
import {
  fetchRequests,
  fetchRequestsCount,
  fetchfilterbyCount,
} from "../../redux/actions/dashboard";

import { fetchAllPodMembers } from "../../redux/helpers/podMembers";
import {
  fetchfilterDetails,
  fetchFilerssDetails,
  fetchSavefilter,
  fetchDeletefilter,
  fetchAllTeamManagers,
} from "../../redux/helpers/dashboard";
import { fetchAllProductaction } from "../../redux/actions/skills";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useSelector, useDispatch } from "react-redux";
import RequestChip from "../../components/RequestChip";
import SlaChip from "../../components/SlaChip";

import TextFieldInput from "../../components/TextField";
import SideDrawer from "./../../components/Drawer";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import styles from "./styles";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ViewDialog from "./../../components/Dialogs";
import PeopleIcon from "@mui/icons-material/People";
// import PersonIcon from "@mui/icons-material/Person";
import ConfirmDialog from "../../components/Dialogs/ConfirmDialog";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const downwardArrow = <ArrowDownwardIcon fontSize="small" />;
const upwardArrow = <ArrowUpwardIcon fontSize="small" />;
const backArrow = <ArrowBackIcon fontSize="small" />;
//const LoggedIN = localStorage.getItem("loggedin-user");
export default function Dashboard({ collapseData }) {
  const classes = styles();
  const [formData, setFormData] = useState({
    requestId: "",
    productName: "",
    clientName: [],
    stages: [],
    productTypes: [],
    productTypesDisplay: [],
    // assignTo: "",
    primaryTeamMember: [],
    filtername: "",
    FilterValue: "",
    TeamManager: [],
  });
  const [saveSuccessDialog, setSaveSuccessDialog] = useState(false);
  const [openTableRow, setOpenTableRow] = React.useState(false);
  const [flagforloading, setflagforloading] = React.useState(false);
  const [linkFlag, setlinkFlag] = React.useState(false);
  const [sortedCondition, setSortedCondition] = React.useState("");
  const [getskillsafterDelete, setgetskillsafterDelete] = useState(false);
  const actionbyId = localStorage.getItem("actionby");
  const {
    productTypes,
    // requestId,
    // productName,
    clientName,
    // stages,
    // assignTo,
    primaryTeamMember,
    FilterValue,
    TeamManager,
    // filtername,
    // teammanagerName,
  } = formData;
  const [filters, setFilters] = React.useState({
    PageNum: 1,
    PageSize: 10,
  });
  // const [searched, setSearched] = useState("");
  const [allPodMembers, setAllPodMembers] = useState([]);

  const [sort, setSort] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allFilters, setAllFilters] = useState([]);
  // const [openDialogFlag, setOpenDialogFlag] = useState(false);
  const [allTeamManagers, setAllTeamManagers] = useState([]);
  const [openDeleteDialogFlag, setOpenDeleteDialogFlag] = useState(false);
  const [deleteDialogSuccess, setDeleteDialogSuccess] = useState(false);
  const [isSavedLoader, setIsSavedLoader] = useState(false);
  const [dashboardName, setDashboardName] = useState("Active Request");
  const [cardRequestStage, setcardRequestStage] = useState("");
  const [cardProductStage, setcardProductStage] = useState("");
  const [ProductPagination, setProductPagination] = useState("");
  const [ProductActionPagination, setProductActionPagination] = useState("");
  const [ClientNamePagination, setClientNamePagination] = useState("");
  const [sortvalueorder, setsortvalueorder] = useState("");
  const [ImplementationTimingPagination, setImplementationTimingPagination] =
    useState("");
  const [ImplSLAFilterPagination, setImplSLAFilterPagination] = useState("");
  const [OverallSLAFilterPagination, setOverallSLAFilterPagination] =
    useState("");
  const [AssignedToPagination, setAssignedToPagination] = useState("");
  const [ManagerPagination, setManagerPagination] = useState("");
  const [selectAllIconFlag, SetselectAllIconFlag] = useState({
    clientName: false,
    productTypes: false,
    primaryTeamMember: false,
    TeamManager:false,
  });
  const [value, setValue] = React.useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [flagValidation, setflagValidation] = useState(true);
  const [nameprop, setnameprop] = useState("");
  const [action, setAction] = React.useState({
    New: false,
    Modify: false,
    Delete: false,
  });

  const [implTimingsstate, setImplTimingsstate] = React.useState({});
  const [implslastate, setImplslastate] = React.useState({});
  const [imploverallslastate, setImploverallslastate] = React.useState({});
  const [implstagestate, setstagestate] = React.useState({});
  const [implrequeststagestate, setrequeststagestate] = React.useState({});
  const [stage, setStage] = React.useState({
    InProgress: false,
    Pending: false,
    Overdue: false,
    wip: false,
    Operations: false,
    Notifications: false,
  });
  const [searchItem, setSearchItem] = useState("");
  const [filterList, setFilterList] = useState(null);
  const [clearFilter, setClearFilter] = useState(false);
  const [saveFilterDrop, setSaveFilterDrop] = React.useState("");
  // const [openFilterDrop, setOpenFilterDrop] = React.useState(false);
  const [loaderforfilter, setloaderforfilter] = React.useState(false);
  const [openDialogSaveFilter, setOpenDialogSaveFilter] = useState(false);
  const [filterNamefordelete, setFilterNamefordelete] = useState("");
  const [filteridfordelete, setFilteridfordelete] = useState("");
  const columns = [
    {
      id: "collapsId",
      label: "1",
      minWidth: 20,
      textIndent: -50,
      format: (value) => (
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpenTableRow(!openTableRow)}
        >
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
      id: "ProductImplementationId",
      label: "Implementaion ID",
      minWidth: 170,
      isClickable: true,
    },
    {
      id: "Product",
      label: "Product & Service",
      minWidth: 100,
      isClickable: true,
    },
    {
      id: "StageDetail",
      label: "Product Form Stage",
      minWidth: 0,
      align: "center",
      format: (value) => (
        <>
          <span>{value.Stage.toLocaleString("en-US")}</span>
          {holdCheck(value.Stage.toLocaleString("en-US")) && (
            <Tooltip title={value.HoldReason} arrow>
              <span>
                <ChatIcon />
              </span>
            </Tooltip>
          )}
        </>
      ),
      isClickable: true,
    },
    {
      id: "ImplementationTiming",
      label: "Implementation Timing",
      minWidth: 0,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      isClickable: true,
    },
    {
      id: "ImplSLA",
      label: "Implementation SLA",
      minWidth: 0,
      align: "center",
      format: (value1) =>
        value1.Key.length ? (
          value1.Key === "Due in" && value1.Value === "01 day" ? (
            <>
              <SlaChip name={"duein01days".toLocaleString("en-US")} />
              <span>{value1.Value.toLocaleString("en-US")}</span>
            </>
          ) : value1.Key === "In Operations" &&
            value1.Value === "Before Breach" ? (
            <>
              <SlaChip name={"inoperationbeforebreach"} />
              <span>{value1.Value.toLocaleString("en-US")}</span>
            </>
          ) : value1.Key === "In Operations" &&
            value1.Value === "After Breach" ? (
            <>
              <SlaChip
                name={"inoperationafterbreach".toLocaleString("en-US")}
              />

              <span>{value1.Value.toLocaleString("en-US")}</span>
            </>
          ) : (
            <>
              <SlaChip
                name={value1.Key && value1.Key.toLocaleString("en-US")}
              />
              <span>{value1.Value.toLocaleString("en-US")}</span>
            </>
          )
        ) : (
          ""
        ),
      isClickable: true,
    },

    {
      id: "OverallSLA",
      label: "Overall SLA",
      minWidth: 0,
      align: "center",
      format: (value1) =>
        value1.Key.length ? (
          value1.Key === "Due in" && value1.Value === "01 day" ? (
            <>
              <SlaChip name={"duein01days".toLocaleString("en-US")} />
              <span>{value1.Value.toLocaleString("en-US")}</span>
            </>
          ) : value1.Key === "In Operations" &&
            value1.Value === "Before Breach" ? (
            <>
              <SlaChip name={"inoperationbeforebreach"} />
              <span>{value1.Value.toLocaleString("en-US")}</span>
            </>
          ) : value1.Key === "In Operations" &&
            value1.Value === "After Breach" ? (
            <>
              <SlaChip
                name={"inoperationafterbreach".toLocaleString("en-US")}
              />

              <span>{value1.Value.toLocaleString("en-US")}</span>
            </>
          ) : (
            <>
              <SlaChip
                name={value1.Key && value1.Key.toLocaleString("en-US")}
              />
              <span>{value1.Value.toLocaleString("en-US")}</span>
            </>
          )
        ) : (
          ""
        ),
      isClickable: true,
    },
    {
      id: "AssignedTo",
      label: "Assigned To",
      minWidth: 0,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      isClickable: true,
    },
    {
      id: "Client",
      label: "Client Name",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      isClickable: true,
    },
  ];
  const columnsCollaps = [
    {
      id: "CreatedDate",
      label: "Created Date",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      isClickable: true,
    },
    {
      id: "ProductAction",
      label: "Action Type",
      minWidth: 170,
      align: "center",
      format: (value) => (
        <RequestChip name={value && value.toLocaleString("en-US")} />
      ),
      isClickable: true,
    },

    {
      id: "RequestId",
      label: "Request ID",
      minWidth: 170,
      isClickable: true,
    },
    {
      id: "RequestStage",
      label: "Request Stage",
      minWidth: 170,
      isClickable: true,
    },
  ];

  const store = useSelector((state) => {
    return state;
  });
  const clientNameSideBar = useSelector(
    (state) => state.filterby?.counts?.data?.ClientNames
  );
  const allProductActionData = useSelector(
    (state) => state.skills?.allProductActionLine.data
  );
  const Impltimings = useSelector(
    (state) => state.filterby?.counts?.data?.ImplementationTimings
  );
  const Implslas = useSelector(
    (state) => state.filterby?.counts?.data?.ImplementationSlas
  );
  const overallslas = useSelector(
    (state) => state.filterby?.counts?.data?.OverallSlas
  );
  const ticketstages = useSelector(
    (state) => state.filterby?.counts?.data?.TicketStages
  );
  function convertClientforSecondName() {
    const clientforsecondname = [];
    for (let i = 0; i < clientNameSideBar?.length; i++) {
      clientforsecondname.push({ Id: i, nameclient: clientNameSideBar[i] });
    }

    return clientforsecondname;
  }
  let dependentFlag = clientNameSideBar?.length || "";
  const clientforsecondname = useMemo(
    () => convertClientforSecondName(),
    [dependentFlag]
  );
  const holdCheck = (str) => {
    let strArray = str.split(" ");
    let flagOnhold = strArray.some((item) => {
      return item === "Hold";
    });
    return flagOnhold;
  };

  const {
    request,
    requestCount,
    products: { allProducts },
  } = store;
  const dispatch = useDispatch();
  useEffect(() => {
   
    getRequests(filters);
    getRequestCounts();
    getAllProducts();
    getfilterby();
    // fetchfilterDetails();
    getAllfiltersLevels();
    getAllPodMembers();
    getProductActionLine();
    getAllTeamManagers();
    //Below comment is to disable warning explicitly, since there is no other workaround.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getRequests(filters);
    getRequestCounts();
    getAllProducts();
    getfilterby();
    // fetchfilterDetails();
    getAllfiltersLevels();
    getAllPodMembers();
    getProductActionLine();

    //Below comment is to disable warning explicitly, since there is no other workaround.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getskillsafterDelete]);

  const getAllTeamManagers = () => {
    setIsLoading(true);
    fetchAllTeamManagers().then((res) => {
      setIsLoading(false);
      setAllTeamManagers(res.Data);
    });
  };

  const defaultProps = {
    options: allTeamManagers,
    getOptionLabel: (option) => option.Name || "",
  };

  const getAllfiltersLevels = () => {
    setIsLoading(true);
    const payload = { Id: 3, Actionby: Number(actionbyId) };
    fetchfilterDetails(payload).then((res) => {
      setIsLoading(false);
      setAllFilters(res.Data);
    });
  };
  const getProductActionLine = () => {
    setIsLoading(true);
    dispatch(fetchAllProductaction()).then(() => {
      setIsLoading(false);
    });
  };
  const getAllProducts = () => {
    setIsLoading(true);
    dispatch(fetchAllProducts()).then(() => {
      setIsLoading(false);
    });
  };
  const getAllPodMembers = () => {
    setIsLoading(true);
    fetchAllPodMembers().then((res) => {
      setIsLoading(false);
      setAllPodMembers(res.Data);
      //setAllPodMembersStore(res.Data);
    });
  };
  // const setSelectedProducts = (value) => {
  //   setFormData({ ...formData, productTypes: value });
  // };

  const getRequests = (filters) => {
   
    setIsLoading(true);
    dispatch(fetchRequests(filters)).then((data) => {
     
      setIsLoading(false);
    });
  };
  const onDeleteProductChipsFilter = (title) => {
    let productTypes = [...formData.productTypes];
    let filteredValue = productTypes.filter((item) => item.ProdName !== title);
    setFormData({
      ...formData,
      productTypes: filteredValue,
      productTypesDisplay: filteredValue,
    });
  };
  const onDeletememberChipsFilter = (title) => {
    let primaryTeamMember = [...formData.primaryTeamMember];
    let filteredValue = primaryTeamMember.filter(
      (item) => item.AgentName !== title
    );
    setFormData({ ...formData, primaryTeamMember: filteredValue });
  };
  const onDeletemanagerChipsFilter = (title) => {
    let TeamManager = [...formData.TeamManager];
    let filteredValue = TeamManager.filter(
      (item) => item.Name !== title
    );
    setFormData({ ...formData, TeamManager: filteredValue });
  };
  
  const deleteDialogOnconform = () => {
    setgetskillsafterDelete(!getskillsafterDelete);
    setDeleteDialogSuccess(false);
  };
  const onDeleteClientChipsFilter = (title) => {
    let clientName = [...formData.clientName];
    let filteredValue = clientName.filter((item) => item.nameclient !== title);
    setFormData({ ...formData, clientName: filteredValue });
  };

  const getRequestCounts = (teamMangaerId="") => {
    setIsLoading(true);
    let payloadforRequestCounts ={"Ids":(teamMangaerId)};
    dispatch(fetchRequestsCount(payloadforRequestCounts)).then((data) => {
      setIsLoading(false);
    });
  };
  const getfilterby = () => {
    setIsLoading(true);
    dispatch(fetchfilterbyCount()).then((data) => {
      setIsLoading(false);
    });
  };

  const handlePaginationChange = (newObj) => {
    setFilters(newObj);
    getRequests(newObj);
  };

  const handlePaginationForward = () => {
    const newPageNum = filters["PageNum"] + 1;
    const newObj = {
      PageNum: newPageNum,
      PageSize: filters["PageSize"],
      SortBy: sortedCondition,
      SearchName: searchItem,
      RequestStage: cardRequestStage,
      ProductFormStage: cardProductStage,
      AssignedTo: AssignedToPagination,
      Client: ClientNamePagination,
      ImplSLAFilter: ImplSLAFilterPagination,
      ImplementationTiming: ImplementationTimingPagination,
      Manager: ManagerPagination,
      OverallSLAFilter: OverallSLAFilterPagination,
      Product: ProductPagination,
      ProductAction: ProductActionPagination,
    };
    handlePaginationChange(newObj);
  };

  const handlePaginationBackward = () => {
    const newPageNum = filters["PageNum"] - 1;
    const newObj = {
      PageNum: newPageNum,
      PageSize: filters["PageSize"],
      SortBy: sortedCondition,
      SearchName: searchItem,
      RequestStage: cardRequestStage,
      ProductFormStage: cardProductStage,
      AssignedTo: AssignedToPagination,
      Client: ClientNamePagination,
      ImplSLAFilter: ImplSLAFilterPagination,
      ImplementationTiming: ImplementationTimingPagination,
      Manager: ManagerPagination,
      OverallSLAFilter: OverallSLAFilterPagination,

      Product: ProductPagination,
      ProductAction: ProductActionPagination,
    };
    handlePaginationChange(newObj);
  };

  const sortHandleClick = (event) => {
    setSort(event.currentTarget);
  };
  const handleClose = () => {
    setSort(null);
  };
  // const defaultProps = {
  //   options: allPodMembers,
  //   getOptionLabel: (option) => option.AgentName||"",

  // };
  const handleChangemanagers = (event, newvalue) => {
    // setPriorityLavel(event.target.value);
    setFormData({
      ...formData,
      // membersList: event.target.value,
      teammanagerName: newvalue,
    });
  };

  const setSelectedPrimaryTeamMembers = (value) => {
    const flag = findSelectAllInData(value, "AgentName");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        primaryTeamMember: !selectAllIconFlag.primaryTeamMember,
      });
    }
    const filteredValue = value.filter((item) => {
      return item.AgentName !== "Select All";
    });
    if (flag) {
      if (allPodMembers.length === formData.primaryTeamMember.length) {
        setFormData({ ...formData, primaryTeamMember: [] });
        // return;
      }
      setFormData({ ...formData, primaryTeamMember: allPodMembers });

      return;
    }
    setFormData({ ...formData, primaryTeamMember: filteredValue });
  };

  const setFlagforprimaryIcon = (value) => {
    const flag = findSelectAllInData(value, "AgentName");

    if (flag) {
      if (allPodMembers.length === formData.primaryTeamMember.length) {
        setFormData({ ...formData, primaryTeamMember: [] });
      }
    }
  };
  const setSelectedTeamManagers = (value) => {
    const flag = findSelectAllInData(value, "Name");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        TeamManager: !selectAllIconFlag.TeamManager,
      });
    }
    const filteredValue = value.filter((item) => {
      return item.Name !== "Select All";
    });
    if (flag) {
      if (allTeamManagers.length === formData.TeamManager.length) {
        setFormData({ ...formData, TeamManager: [] });
        // return;
      }
      setFormData({ ...formData, TeamManager: allTeamManagers });

      return;
    }
    setFormData({ ...formData, TeamManager: filteredValue });
  };

  const setFlagformanagerIcon = (value) => {
    const flag = findSelectAllInData(value, "Name");

    if (flag) {
      if (allTeamManagers.length === formData.TeamManager.length) {
        setFormData({ ...formData, TeamManager: [] });
      }
    }
  };
  const dashboardNameChange = (requstedId, ticketType, label) => {
    setlinkFlag(true);
    setDashboardName(label);
    setcardRequestStage(requstedId.toString());
    let objNew = { PageNum: 1, PageSize: 10 };
    const filterforrequest = {
      ...objNew,
      // Product: product,
      // Client: client,
      AssignedTo: "",
      Product: "",
      Client: "",
      ProductAction: "",
      ImplementationTiming: "",
      ImplSLAFilter: "",
      OverallSLAFilter: "",
      //RequestStage: requstedId.toString(),
      ProductFormStage: requstedId.toString(),
      Manager: "",
      // TicketStage: updatedTicketStage ? updatedTicketStage.toString() : "",
    };
    setFilters(filterforrequest);
    getRequests(filterforrequest);
  };

  const open = Boolean(sort);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (event) => {
    setValue(event.target.value);
    let objectSortby = {
      created_date_asc: "createddate_ASC",
      created_date_desc: "createddate_DESC",
      "request iD asc": "ReqId_ASC",
      "request iD desc": "ReqId_DESC",
      "product action asc": "productaction_ASC",
      " product action desc": "productaction_DESC",
      "request stage asc":"reqstage_ASC",
      "request stage desc":"reqstage_DESC",
    };

    const filter = getSortbyData(objectSortby[event.target.value]);
    setFilters(filter);
    getRequests(filter);
  };
  function findSelectAllInData(value, Name = "Name") {
    let DataWithOnlyName = [];
    for (let i = 0; i < value.length; i++) {
      DataWithOnlyName.push(value[i]?.[Name]);
    }
    const Flag = DataWithOnlyName.includes("Select All");
    return Flag;
  }
  const setSelectedProducts = (value) => {
    const flag = findSelectAllInData(value, "ProdName");
    const filteredValue = value.filter((item) => {
      return item.ProdName !== "Select All";
    });

    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        productTypes: !selectAllIconFlag.productTypes,
      });
      if (allProducts?.data.length === formData.productTypes.length) {
        setFormData({ ...formData, productTypes: [] });
        // return;
      }
      setFormData({ ...formData, productTypes: allProducts.data });

      return;
    }

    setFormData({ ...formData, productTypes: filteredValue });
  };
  // const productSetfunction = (value) => {
  //   setFormData({ ...formData, productTypes: allProducts.data });
  // };
  const setFlagforIconproduct = (value) => {
    const flag = findSelectAllInData(value, "ProdName");

    if (flag) {
      if (allProducts?.data.length === formData.productTypes.length) {
        setFormData({ ...formData, productTypes: [] });
      }
    }
  };
  const setSelectedClientNames = (value) => {
    const flag = findSelectAllInData(value, "nameclient");
    if (flag) {
      SetselectAllIconFlag({
        ...selectAllIconFlag,
        clientName: !selectAllIconFlag.clientName,
      });
    }

    const filteredValue = value.filter((item) => {
      return item.nameclient !== "Select All";
    });
    if (flag) {
      if (clientforsecondname.length === formData.clientName.length) {
        setFormData({ ...formData, clientName: [] });
        return;
      }
      setFormData({ ...formData, clientName: clientforsecondname });

      return;
    }
    setFormData({ ...formData, clientName: filteredValue });
  };
  const setFlagforIconclient = (value) => {
    const flag = findSelectAllInData(value, "nameclient");

    if (flag) {
      if (clientforsecondname.length === formData.clientName.length) {
        setFormData({ ...formData, clientName: [] });
      }
    }
  };

  // function Nonebasedvalues() {
  //   //   console.log('kkkk',action)
  //   setFormData({
  //     ...formData,
  //     productTypes: [],
  //     primaryTeamMember: [],
  //     clientName: [],
  //     teammanagerName: {},
  //   });

  //   setAction({ ...action, New: false, Modify: false, Delete: false });

  //   //   // setFormData({ ...formData, clientName: ""});
  //   let objforImpltimings = {};

  //   Impltimings &&
  //     // Object.keys(requestCount.counts.data).map((item) => {
  //     Impltimings.map((item) => {
  //       objforImpltimings[item.Name] = false;
  //     });

  //   setImplTimingsstate(objforImpltimings);
  //   let objImplslas = {};

  //   Implslas &&
  //     // Object.keys(requestCount.counts.data).map((item) => {
  //     Implslas.map((item) => {
  //       objImplslas[item.Name] = false;
  //     });

  //   setImplslastate(objImplslas);

  //   let objoverallslas = {};

  //   overallslas &&
  //     // Object.keys(requestCount.counts.data).map((item) => {
  //     overallslas.map((item) => {
  //       objoverallslas[item.Name] = false;
  //     });

  //   setImploverallslastate(objoverallslas);
  //   let objticketstages = {};

  //   ticketstages &&
  //     // Object.keys(requestCount.counts.data).map((item) => {
  //     ticketstages.map((item) => {
  //       objticketstages[item.StageName] = false;
  //     });

  //   setstagestate(objticketstages);
  //   return;
  // }
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
    // !open&&setSaveFilterDrop(1);Nonebasedvalues()
  };

  const clearallAction = () => {
    setFilterList({
      ...filterList,
      implslastate: [],
      ProductAction: [],
      implimentationTimingsstate: [],

      imploverallslastate: [],
      implstagestate: [],
      implrequeststagestate: [],
      Product: [],
      primaryTeamMember: [],
      clientName: [],
      TeamManager: [],
    });
    setnameprop("clearAll");
    setAction({ ...action, New: false, Modify: false, Delete: false });

    setFormData({
      ...formData,
      productTypes: [],
      primaryTeamMember: [],
      clientName: [],
      TeamManager: [],
    });

    //  setFormData({...formData, primaryTeamMember:[]})

    //  setFormData({...formData, clientName:[]})
    //  setFormData({ ...formData, teammanagerName: {} }); // blank
    const filter = {
      ...filters,
      // Product: product,
      // Client: client,
      AssignedTo: "",
      Product: "",
      Client: "",
      ProductAction: "",
      ImplementationTiming: "",
      ImplSLAFilter: "",
      OverallSLAFilter: "",
      RequestStage: "",
      ProductFormStage:"",
      Manager: "",

      // TicketStage: updatedTicketStage ? updatedTicketStage.toString() : "",
    };
    setFilters(filter);
    getRequests(filter);
  };

  const Impltimingsstatechange = useCallback( () => {
    let obj = {};

    Impltimings &&
      // Object.keys(requestCount.counts.data).map((item) => {
      Impltimings.map((item) => (obj[item.Name] = false));

    setImplTimingsstate(obj);
  },[Impltimings]);
  const Implslasstatechange =useCallback( () => {
    let obj = {};

    Implslas &&
      // Object.keys(requestCount.counts.data).map((item) => {
      Implslas.map((item) => (obj[item.Name] = false));

    setImplslastate(obj);
  },[Implslas]);
  const overallslasstatechange = useCallback( () => {
    let obj = {};

    overallslas &&
      // Object.keys(requestCount.counts.data).map((item) => {
      overallslas.map((item) => (obj[item.Name] = false));

    setImploverallslastate(obj);
  },[overallslas]);
  // const ticketstagesstatechange = () => {
  //   let obj = {};
  //   ticketstages &&
  //     // Object.keys(requestCount.counts.data).map((item) => {
  //     ticketstages.map((item) => (obj[item.StageName] = false));
  //   setstagestate(obj);
  // };
  const ticketstagesstatechange = useCallback( () => {
    let obj = {};
    ticketstages &&
      // Object.keys(requestCount.counts.data).map((item) => {
      ticketstages.map((item) => (obj[item.StageName] = false));
    setstagestate(obj);
  },[ticketstages]);
  const ticketrequeststagesstatechange = useCallback( () => {
    let obj = {};
    ticketstages &&
      // Object.keys(requestCount.counts.data).map((item) => {
      ticketstages.map((item) => (obj[item.StageName] = false));
    setrequeststagestate(obj);
  },[ticketstages]);
  let clearAllFlag = nameprop === "clearAll" ? true : false
useEffect(() => {
  Impltimingsstatechange();
}, [Impltimingsstatechange, clearAllFlag]);
  
  useEffect(() => {
    Implslasstatechange();
  }, [Implslasstatechange,clearAllFlag]);
  useEffect(() => {
    overallslasstatechange();
  }, [overallslasstatechange, clearAllFlag]);
  useEffect(() => {
    ticketstagesstatechange();
  }, [ticketstagesstatechange,clearAllFlag]);
  useEffect(() => {
    ticketrequeststagesstatechange();
  }, [ticketrequeststagesstatechange,clearAllFlag]);

  // useEffect(() => {
  //   // let obj = {};

  //   // Implslas &&
  //   //   // Object.keys(requestCount.counts.data).map((item) => {
  //   //   Implslas.map((item) => {
  //   //     obj[item.Name] = false;
  //   //   });

  //   // setImplslastate(obj);
  // }, [Implslas?.length, nameprop == "clearAll"]);

  // useEffect(() => {
  //   let obj = {};

  //   overallslas &&
  //     // Object.keys(requestCount.counts.data).map((item) => {
  //     overallslas.map((item) => {
  //       obj[item.Name] = false;
  //     });

  //   setImploverallslastate(obj);
  // }, [overallslas?.length, nameprop == "clearAll"]);

  // useEffect(() => {
  //   let obj = {};

  //   ticketstages &&
  //     // Object.keys(requestCount.counts.data).map((item) => {
  //     ticketstages.map((item) => {
  //       obj[item.StageName] = false;
  //     });

  //   setstagestate(obj);
  // }, [ticketstages?.length, nameprop == "clearAll"]);

  const actionTypeHandleChange = (event) => {
    setAction({ ...action, [event.target.name]: event.target.checked });
  };
  // const [imptime,setimptime]=useState("")
  const implTimingTypeHandleChange = (event) => {
    // setimptime(event.target.name);

    setImplTimingsstate({
      ...implTimingsstate,
      [event.target.name]: event.target.checked,
    });
  };
  const implslaTypeHandleChange = (event) => {
    // setimptime(event.target.name);

    setImplslastate({
      ...implslastate,
      [event.target.name]: event.target.checked,
    });
  };
  const overallslaTypeHandleChange = (event) => {
    // setimptime(event.target.name);

    setImploverallslastate({
      ...imploverallslastate,
      [event.target.name]: event.target.checked,
    });
  };
  const implstageTypeHandleChange = (event) => {
    // setimptime(event.target.name);

    setstagestate({
      ...implstagestate,
      [event.target.name]: event.target.checked,
    });
  };
  const implrequeststageTypeHandleChange = (event) => {
    // setimptime(event.target.name);
console.log('fff',event.target.name)
    setrequeststagestate({
      ...implrequeststagestate,
      [event.target.name]: event.target.checked,
      // [`${event.target.name}request`]: event.target.checked,
    });
  };
  const getCheckboxSelectedValues = (list) => {
    if (list) {
      return Object.keys(list).filter((ele) => list[ele] === true);
      // return Object.values(list).filter((ele) => list[ele] === true);
    }
  };

  async function skillssearch(value) {
    let objNew = {
      PageNum: 1,
      PageSize: 10,
      // RequestId: requestId,
      Product: ProductPagination ? ProductPagination : "",
      ProductAction: ProductActionPagination ? ProductActionPagination : "",
      // Client: "William Smith",
      Client: ClientNamePagination ? ClientNamePagination : "",
      // TicketStage: getCheckboxSelectedValues(stage).toString(),
      ProductFormStage: cardProductStage?cardProductStage:"",
      RequestStage: cardRequestStage ? cardRequestStage : "",
     
      ImplementationTiming: ImplementationTimingPagination
        ? ImplementationTimingPagination
        : "",
      ImplSLAFilter: ImplSLAFilterPagination
        ? ImplementationTimingPagination
        : "",
      OverallSLAFilter: OverallSLAFilterPagination
        ? OverallSLAFilterPagination
        : "",
      AssignedTo: AssignedToPagination ? AssignedToPagination : "",
      Manager: ManagerPagination ? ManagerPagination : "",
      SortBy: sortvalueorder ? sortvalueorder : "",
      SearchName: value,
    };
    setSearchItem(value);
    // let newObj = !value.length
    //   ? { ...objNew, "SearchName": value }
    //   : { ...filters, "SearchName": value };
    let newObj = { ...objNew };

    await getRequests(newObj);
  }
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
  const debounceMethod = useCallback(
    debounceFunction((nextValue) => skillssearch(nextValue), 1000),

    [
      ProductPagination,
      ProductActionPagination,
      ClientNamePagination,
      cardRequestStage,
      cardProductStage,
      ImplementationTimingPagination,
      ImplSLAFilterPagination,
      OverallSLAFilterPagination,
      AssignedToPagination,
      ManagerPagination,
      sortvalueorder,
    ]
  );

  function converttoarrayofids(updateddata, alldata) {
    let resultantdata = alldata.filter((item) => {
      if (item.ActionName) {
        return updateddata?.includes(item.ActionName);
      } else {
        if (item.StageName) {
          return updateddata?.includes(item.StageName);
        } else {
          if (item.ProdName) {
            return updateddata?.includes(item.ProdName);
          } else {
            if (item.nameclient) {
              return updateddata?.includes(item.nameclient);
            } else {
              if (item.AgentName) {
                return updateddata?.includes(item.AgentName);
              } else {
                return updateddata?.includes(item.Name);
              }
            }
          }
          //  return ki?.includes(item.Name)
        }
      }
      //  return item.ActionName?ki.includes(item.ActionName):item.StageName?ki.includes(item.StageName):ki.includes(item.Name)
      //  item.Name&&ki.includes(item.Name),item.StageName&&ki.includes(item.StageName)
    });

    let resultantstring = convertArra2string(resultantdata);

    return resultantstring;
  }

  function converttoarrayofproductids(updateddata, alldata) {
    alldata.filter((item) => {
      return updateddata.includes(item.ProdName);
    });

    //  return item.ActionName?ki.includes(item.ActionName):item.StageName?ki.includes(item.StageName):ki.includes(item.Name)
    //  item.Name&&ki.includes(item.Name),item.StageName&&ki.includes(item.StageName)
    //  console.log('valueuuu',ji)
    //  let value=convertArra2string(ji)
    //  console.log('value',value)
    //    return value
  }

  function converttoarrayofclientids(updateddata, alldata) {
    alldata.filter((item) => {
      return updateddata.includes(item.nameclient);
    });
  }

  const getProductarraySelectedValues = (value) => {
    let re = value.map((item) => {
      return item.ProdName;
    });
    return re;
  };
  const getClientarraySelectedValues = (value) => {
    let re = value.map((item) => {
      return item.nameclient;
    });
    return re;
  };

  const getassignedSelectedValues = (value) => {
    let re = value.map((item) => {
      return item.AgentName;
    });
    return re;
  };
  const getManagerarraySelectedValues = (value) => {
    let re = value.map((item) => {
      return item.Name;
    });
    return re;
  };

  // const getCheckBoxCombind = () => {
  //   let arr = [];
  //   const selectAction = getCheckboxSelectedValues(action);
  //   const selectStage = getCheckboxSelectedValues(stage);
  //   if(productName){
  //     arr.push(productName)
  //   }
  //   if(clientName){
  //     arr.push(clientName)
  //   }
  //   return [...arr, ...selectAction, ...selectStage];
  // }

  const onDeleteProductTypeChip =
    (item, ele = null) =>
    () => {
      let updatedTicketStage = filterList?.TicketStage;
      let updatedProductAction = filterList?.ProductAction;
      let updatedimplimentationTimingsstate =
        filterList?.implimentationTimingsstate;
      let updatedimplslastate = filterList?.implslastate;
      let updatedimploverallslastate = filterList?.imploverallslastate;
      let updatedimplstagestate = filterList?.implstagestate;
      let updatedrequestimplstagestate = filterList?.implrequeststagestate;
      let updatedproduct = filterList?.Product;
      let updatedclientName = filterList?.clientName;
      // let product = productName;
      // let product = productTypes;
      // let client = clientName;
      let updatedassimember = filterList?.primaryTeamMember;
      let updatedteamman = filterList?.TeamManager;

      switch (item) {
        case "ProductAction":
          updatedProductAction = filterList?.ProductAction?.filter(
            (el) => el !== ele
          );

          setFilterList({
            ...filterList,
            ProductAction: [...updatedProductAction],
          }); // set all data null

          setAction({ ...action, [`${ele}`]: false }); // state false

          break;
        case "implimentationTimingsstate":
          updatedimplimentationTimingsstate =
            filterList?.implimentationTimingsstate?.filter((el) => el !== ele);
          setFilterList({
            ...filterList,
            implimentationTimingsstate: [...updatedimplimentationTimingsstate],
          }); // set all data null
          setImplTimingsstate({ ...implTimingsstate, [`${ele}`]: false }); // state false
          break;
        case "implslastate":
          updatedimplslastate = filterList?.implslastate?.filter(
            (el) => el !== ele
          );
          setFilterList({
            ...filterList,
            implslastate: [...updatedimplslastate],
          }); // set all data null
          setImplslastate({ ...implslastate, [`${ele}`]: false }); // state false
          break;

        case "imploverallslastate":
          updatedimploverallslastate = filterList?.imploverallslastate?.filter(
            (el) => el !== ele
          );
          setFilterList({
            ...filterList,
            imploverallslastate: [...updatedimploverallslastate],
          }); // set all data null
          setImploverallslastate({ ...imploverallslastate, [`${ele}`]: false }); // state false
          break;

        case "implstagestate":
          updatedimplstagestate = filterList?.implstagestate?.filter(
            (el) => el !== ele
          );
          setFilterList({
            ...filterList,
            implstagestate: [...updatedimplstagestate],
          }); // set all data null
          setstagestate({ ...implstagestate, [`${ele}`]: false }); // state false
          break;
          case "implrequeststagestate":
            updatedrequestimplstagestate = filterList?.implrequeststagestate?.filter(
              (el) => el !== ele
            );
            setFilterList({
              ...filterList,
              implrequeststagestate: [...updatedrequestimplstagestate],
            }); // set all data null
            setrequeststagestate
            ({ ...implrequeststagestate, [`${ele}`]: false }); // state false
            break;
        case "TicketStage":
          updatedTicketStage = filterList?.TicketStage?.filter(
            (el) => el !== ele
          );
          setFilterList({
            ...filterList,
            TicketStage: [...updatedTicketStage],
          });
          setStage({ ...stage, ele: false }); // state false
          break;

        case "Product":
          updatedproduct = filterList?.Product?.filter((el) => el !== ele);

          setFilterList({
            ...filterList,
            Product: [...updatedproduct],
          });
          let arrayofproductids = converttoarrayofproductids(
            updatedproduct,
            allProducts.data
          );

          setFormData({ ...formData, productTypes: arrayofproductids });
          // product = "";
          // delete filterList["Product"];
          // setFilterList(filterList);
          // setFormData({ ...formData, productName: "" }); // blank
          // setFormData({ ...formData, productTypes: [] });
          break;
        // case "primaryTeamMember":
        //   assimember = "";
        // delete filterList["primaryTeamMember"];
        // setFilterList(filterList);
        // // setFormData({ ...formData, productName: "" }); // blank
        // setFormData({ ...formData, primaryTeamMember: "" });
        // break;
        case "primaryTeamMember":
          updatedassimember = filterList?.primaryTeamMember?.filter(
            (el) => el !== ele
          );

          setFilterList({
            ...filterList,
            primaryTeamMember: [...updatedassimember],
          });
          let arrayofproductidsvaues = converttoarrayofproductids(
            updatedassimember,
            allPodMembers
          );

          setFormData({
            ...formData,
            primaryTeamMember: arrayofproductidsvaues,
          });
          // product = "";
          // delete filterList["Product"];
          // setFilterList(filterList);
          // setFormData({ ...formData, productName: "" }); // blank
          // setFormData({ ...formData, productTypes: [] });
          break;
        case "clientName":
          updatedclientName = filterList?.clientName?.filter(
            (el) => el !== ele
          );

          setFilterList({
            ...filterList,
            clientName: [...updatedclientName],
          });
          let arrayofclientids = converttoarrayofclientids(
            updatedclientName,
            clientforsecondname
          );

          setFormData({ ...formData, clientName: arrayofclientids });
          // product = "";
          // delete filterList["Product"];
          // setFilterList(filterList);
          // setFormData({ ...formData, productName: "" }); // blank
          // setFormData({ ...formData, productTypes: [] });
          break;
        case "TeamManager":
          delete filterList["TeamManager"];
          setFilterList(filterList);
          setFormData({ ...formData, TeamManager: [] }); // blank
          // setFormData({ ...formData, productTypes: [] });
          break;
        // case " teammanagerName":
        //   teamman= "";
        // delete filterList["teammanagerName"];
        // setFilterList(filterList);
        // // setFormData({ ...formData, productName: "" }); // blank
        // setFormData({ ...formData, primaryTeamMember: "" });
        // break;

        // case "Client":
        //   client = "";
        //   delete filterList["Client"];
        //   setFilterList(filterList);
        //   // setFormData({ ...formData, clientName: "" }); // blank
        //   setFormData({ ...formData, clientName: "" });
        //   break;
        default:
          break;
      }
      // console.log('jujuj',clearallValidation())
      //    setflagValidation(!clearallValidation);

      const filter = {
        ...filters,
        // Product: product,
        // Client: client,
        AssignedTo: converttoarrayofids(updatedassimember, allPodMembers) || "",
        Product: converttoarrayofids(updatedproduct, allProducts.data) || "",
        Client: updatedclientName.toString() || "",
        ProductAction:
          converttoarrayofids(updatedProductAction, allProductActionData) || "",
        ImplementationTiming:
          converttoarrayofids(updatedimplimentationTimingsstate, Impltimings) ||
          "",
        ImplSLAFilter: converttoarrayofids(updatedimplslastate, Implslas) || "",
        OverallSLAFilter:
          converttoarrayofids(updatedimploverallslastate, overallslas) || "",
          ProductFormStage:
          converttoarrayofids(updatedimplstagestate, ticketstages) || "",
          RequestStage:
          converttoarrayofids(updatedrequestimplstagestate, ticketstages) || "",
        Manager: filterList.TeamManager
          ? converttoarrayofids(updatedteamman, allTeamManagers)
          : "",

        // TicketStage: updatedTicketStage ? updatedTicketStage.toString() : "",
      };
      setFilters(filter);
      getRequests(filter);
      getRequestCounts(filter.Manager)

      // const updatedFilter = filterList && filterList.filter(p => p !== item);
      // setFilterList(updatedFilter);
    };

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // const [clearallValidation, setclearallValidation] = useState(true);
  function clearallValidation() {
    let filterListValues = filterList != null && Object.values(filterList);
    let filterListBooleanValues =
      filterListValues &&
      filterListValues.map((e) => {
        return e?.length === 0;
      });
    let checker =
      filterListBooleanValues &&
      filterListBooleanValues.every((v) => v === true);
    return filterList == null ? true : checker;
  }
  const sideFilterDrawer = () => {
    const filterList = sideFilterList();
   
    const filter = getFilterData();
  
    // const selectedmanagerId=getManagerData();
    const selectedmanagerId=getFilterData().Manager;
    setFilterList(filterList);
    setFilters(filter);
    getRequestCounts(selectedmanagerId)
    getRequests(filter);
    setDrawerOpen(false);
    setClearFilter(!clearFilter);
    // setSaveFilterDrop(1);Nonebasedvalues()
  };

  const sideFilterList = () => {
    const filterList = {};
    if (productTypes) {
      filterList["Product"] = getProductarraySelectedValues(productTypes);
    }
    if (clientName) {
      filterList["clientName"] = getClientarraySelectedValues(clientName);
    }

    if (primaryTeamMember) {
      filterList["primaryTeamMember"] =
        getassignedSelectedValues(primaryTeamMember);
    }
    if (TeamManager) {
      filterList["TeamManager"] =
        getManagerarraySelectedValues(TeamManager);
    }

    // if (clientName.length>0) {
    //   filterList["Client"] = clientName;
    // }
    if (getCheckboxSelectedValues(action)?.length > 0) {
      filterList["ProductAction"] = getCheckboxSelectedValues(action);
    }
    if (getCheckboxSelectedValues(implTimingsstate)?.length > 0) {
      filterList["implimentationTimingsstate"] =
        getCheckboxSelectedValues(implTimingsstate);
    }
    if (getCheckboxSelectedValues(implslastate)?.length > 0) {
      filterList["implslastate"] = getCheckboxSelectedValues(implslastate);
    }
    if (getCheckboxSelectedValues(imploverallslastate)?.length > 0) {
      filterList["imploverallslastate"] =
        getCheckboxSelectedValues(imploverallslastate);
    }
    if (getCheckboxSelectedValues(implstagestate)?.length > 0) {
      filterList["implstagestate"] = getCheckboxSelectedValues(implstagestate);
    }
    if (getCheckboxSelectedValues(implrequeststagestate)?.length > 0) {
      filterList["implrequeststagestate"] = getCheckboxSelectedValues(implrequeststagestate);
    }

    // if (getCheckboxSelectedValues(stage)?.length > 0) {
    //   filterList["TicketStage"] = getCheckboxSelectedValues(stage);
    // }

    return filterList;
  };
  function conversionback(valuedata, arraydata) {
    //    let dr=ProductTypes;
    // let gt=allProducts.data;
    let spliitedvaluedata = valuedata.split(",");

    // let ki = b.length;
    let arr1 = [];
    for (let i = 0; i < spliitedvaluedata.length; i++) {
      arr1.push(
        arraydata.find((item) => item.Id === Number(spliitedvaluedata[i]))
      );
    }
    return arr1;
  }
  function conversionbackobject(valuedata, arraydata) {
    //    let dr=ProductTypes;
    // let gt=allProducts.data;
    // let b = valuedata;

    let obj = arraydata.find((item) => item.Id === Number(valuedata));

    return obj;
  }
  function conversionbackclient(valuedata, arraydata) {
    //    let dr=ProductTypes;
    // let gt=allProducts.data;

    let splittedvaluedata = valuedata.split(",");

    // let ki = b.length;
    let arr1 = [];
    for (let i = 0; i < splittedvaluedata.length; i++) {
      arr1.push(
        arraydata.find((item) => item.nameclient === splittedvaluedata[i])
      );
    }
    return arr1;
  }
  const mapNumbersToArrayOfObject = (statevalue, datavalue) => {
    if (datavalue.length > 0) {
      if (statevalue === action) {
        let newobj = { ...statevalue };

        datavalue.map((item) => (newobj[`${item.ActionName}`] = true));
        setAction(newobj);
      } else if (statevalue === implstagestate) {
        let newobj = { ...statevalue };

        datavalue.map((item) => (newobj[`${item.StageName}`] = true));
        setstagestate(newobj);
      }
      else if (statevalue === implrequeststagestate) {
        let newobj = { ...statevalue };

        datavalue.map((item) => (newobj[`${item.StageName}`] = true));
        setrequeststagestate(newobj);
      }
       else {
        let newobj = { ...statevalue };

        datavalue.map((item) => (newobj[`${item.Name}`] = true));
        statevalue === implslastate && setImplslastate(newobj);
        statevalue === implTimingsstate && setImplTimingsstate(newobj);
        statevalue === imploverallslastate && setImploverallslastate(newobj);
      }
    }
  };

  const getfilterbasedDetails = (filterId) => {
    const payload = { Id: filterId };
    setloaderforfilter(true);
    fetchFilerssDetails(payload).then((res) => {
      setloaderforfilter(false);
      //   membersList == null && setLoadingforedit(false);
      const allfilterData = res && res["Data"];

      const {
        AssignedToIds,
        ClientNames,
        ImplSLAs,
        ImplementationTimings,
        Manager,
        OverallSLAs,
        ProductActions,
        ProductTypes,
        RequestStages,
      } = allfilterData.FilterDataModel;

      let Productdata = ProductTypes
        ? conversionback(ProductTypes, allProducts.data)
        : [];
      let clientdata = ClientNames
        ? conversionbackclient(ClientNames, clientforsecondname)
        : [];
      // // const Productdata = allProducts.find(item => item.id === Number(ProductTypes));
      let impltimingdata = ImplementationTimings
        ? conversionback(ImplementationTimings, Impltimings)
        : [];
      let impltSLAdata = ImplSLAs ? conversionback(ImplSLAs, Implslas) : [];
      let overallsladata = OverallSLAs
        ? conversionback(OverallSLAs, overallslas)
        : [];
      let requestdata = RequestStages
        ? conversionback(RequestStages, ticketstages)
        : [];
      let assigneddata = AssignedToIds
        ? conversionback(AssignedToIds, allPodMembers)
        : [];
      let productActiondata = ProductActions
        ? conversionback(ProductActions, allProductActionData)
        : [];
      let managerdata = Manager
        ? conversionback(Manager, allTeamManagers)
        : [];
      // productSetfunction(Productdata);
      setFormData({
        ...formData,
        primaryTeamMember: assigneddata,
        productTypes: Productdata,
        clientName: clientdata,
        TeamManager: managerdata,
      });
      // setAssignedToTeamMember(assigneddatawe)

      // setAction({ ...action, [event.target.name]: event.target.checked });
      // clientdata&&setSelectedClientNames(clientdata);
      // clientdata&&setFlagforIcon4(clientdata);

      // setassignedProductData(Productdata)
      mapNumbersToArrayOfObject(action, productActiondata);
      mapNumbersToArrayOfObject(implTimingsstate, impltimingdata);
      mapNumbersToArrayOfObject(implslastate, impltSLAdata);
      mapNumbersToArrayOfObject(imploverallslastate, overallsladata);
      mapNumbersToArrayOfObject(implstagestate, requestdata);
      mapNumbersToArrayOfObject(implrequeststagestate, requestdata);

      // setSelectedPrimaryTeamMembers(assigneddata);

      //           setFlagforprimaryIcon(assigneddata);
    });
  };

  // function setAssignedToTeamMember(assigneddatawe) {
  //   setSelectedPrimaryTeamMembers(assigneddatawe);
  //   // setFlagforprimaryIcon(assigneddatawe);
  // }
  // function setassignedProductData(Productdata) {
  //   setSelectedProducts(Productdata);
  //   // setFlagforIcon3(Productdata);
  // }
  const convertArra2string = (array) => {
    const newarra = [];
    for (let i = 0; i < array.length; i++) {
      newarra.push(array[i].Id);
    }

    const newvalue = newarra.toString();

    return newvalue;
  };
  // const convertObject2string = (array) => {
  //   let newarra = array.Id;

  //   const newvalue = newarra.toString();

  //   return newvalue;
  // };
  const handleChangeFilter = (event) => {
    // setFilterValue(event.target.value);

    setFormData({
      ...formData,
      FilterValue: event.target.value,
    });
  };
  const getarraySelectedValues = (value) => {
    let re = value?.map((item) => {
      return item.nameclient;
    });
    return re?.toString();
  };
  const handleSaveFilterAs = () => {
    const { productTypes, primaryTeamMember } = formData;
    let selectedproductActionvalues = allProductActionData.filter((item) => {
      return action[`${item.ActionName}`] === true;
    });
    let selectedImpltimingsvalues = Impltimings.filter((item) => {
      return implTimingsstate[`${item.Name}`] === true;
    });
    let selectedImplslasvalues = Implslas.filter((item) => {
      return implslastate[`${item.Name}`] === true;
    });
    let selectedoverallslasvalues = overallslas.filter((item) => {
      return imploverallslastate[`${item.Name}`] === true;
    });
    let selectedticketstagesvalues = ticketstages.filter((item) => {
      return implstagestate[`${item.StageName}`] === true;
    });
    // console.log('ki',productTypes,
    // clientName,
    // primaryTeamMember,)

    const payload = {
      FilterName: formData.filtername,
      Ispublic: formData.FilterValue === "set" ? true : false,
      Createdby: 3,
      FilterDataModel: {
        ProductTypes: productTypes ? convertArra2string(productTypes) : "",
        ClientNames: formData?.clientName
          ? getarraySelectedValues(formData?.clientName)
          : "",
        RequestStages: selectedticketstagesvalues
          ? convertArra2string(selectedticketstagesvalues)
          : "",
        ImplSLAs: selectedImplslasvalues
          ? convertArra2string(selectedImplslasvalues)
          : "",
        OverallSLAs: selectedoverallslasvalues
          ? convertArra2string(selectedoverallslasvalues)
          : "",
        AssignedToIds: primaryTeamMember
          ? convertArra2string(primaryTeamMember)
          : "",
        ProductActions: selectedproductActionvalues
          ? convertArra2string(selectedproductActionvalues)
          : "",
        ImplementationTimings: selectedImpltimingsvalues
          ? convertArra2string(selectedImpltimingsvalues)
          : "",
        // "Manager":"2",
        Manager: TeamManager
        ? convertArra2string(TeamManager)
        : "",
      },
    };

    fetchSavefilter(payload).then((res) => {
      // setIsSavedLoader(false);
      // setIsLoading(false);
      // setSaveDialog(false);
      if (res && res["Success"]) {
        setflagforloading(false);
        setOpenDialogSaveFilter(false);
        setSaveSuccessDialog(true);
        // sideFilterDrawer();
        // getAllfiltersLevels();
        // setSaveSuccessDialog(true);
        //setBtnLoading(false);
        // HandleAfterSave();

        return;
      }
      // setErrormessage(res["Message"])

      // setErrorDialog(true);

      // alert(`Error - ${res["Message"]}`);
    });
  };
  const filterSave = () => {
    // setDeleteDialogSuccess(true)
    setflagforloading(true);
    handleSaveFilterAs();
    // setOpenDeleteDialogFlag(false);
  };
  // const getManagerData = () => {
  //     let managerName = teammanagerName
  //     ? teammanagerName.Id && teammanagerName.Id.toString()
  //     : "";
  //   return  managerName || ""
  // };
  const getFilterData = (sortValue = null) => {
    let selectedproductActionvalues = allProductActionData.filter((item) => {
      return action[`${item.ActionName}`] === true;
    });
    let selectedImpltimingsvalues = Impltimings.filter((item) => {
      return implTimingsstate[`${item.Name}`] === true;
    });
    let selectedImplslasvalues = Implslas.filter((item) => {
      return implslastate[`${item.Name}`] === true;
    });
    let selectedoverallslasvalues = overallslas.filter((item) => {
      return imploverallslastate[`${item.Name}`] === true;
    });
    let selectedproductformstagesvalues = ticketstages.filter((item) => {
      return implstagestate[`${item.StageName}`] === true;
    });
    let selectedrequestticketstagesvalues = ticketstages.filter((item) => {
      return implrequeststagestate[`${item.StageName}`] === true;
    });
    let managerName = TeamManager
      ? TeamManager.Id && TeamManager.Id.toString()
      : "";

    setSortedCondition(sortValue != null ? sortValue : "");
    setcardProductStage(
      selectedproductformstagesvalues
        ? convertArra2string(selectedproductformstagesvalues)
        : ""
    );
    setcardRequestStage(
      selectedrequestticketstagesvalues
        ? convertArra2string(selectedrequestticketstagesvalues)
        : ""
    );
    setProductPagination(productTypes ? convertArra2string(productTypes) : "");
    setProductActionPagination(
      selectedproductActionvalues
        ? convertArra2string(selectedproductActionvalues)
        : ""
    );
    setClientNamePagination(
      formData.clientName ? getarraySelectedValues(formData.clientName) : ""
    );
    setImplementationTimingPagination(
      selectedImpltimingsvalues
        ? convertArra2string(selectedImpltimingsvalues)
        : ""
    );
    setImplSLAFilterPagination(
      selectedImplslasvalues ? convertArra2string(selectedImplslasvalues) : ""
    );
    setOverallSLAFilterPagination(
      selectedImplslasvalues ? convertArra2string(selectedImplslasvalues) : ""
    );
    setAssignedToPagination(
      primaryTeamMember ? convertArra2string(primaryTeamMember) : ""
    );
    setManagerPagination( TeamManager ? convertArra2string(TeamManager) : "");

    return {
      // PageNum: request?.list?.currentPage,
      // PageSize: request?.list?.pageSize,
      PageNum: 1,
      PageSize: 10,
      // RequestId: requestId,
      Product: productTypes ? convertArra2string(productTypes) : "",
      ProductAction: selectedproductActionvalues
        ? convertArra2string(selectedproductActionvalues)
        : "",
      // Client: "William Smith",
      Client: formData.clientName
        ? getarraySelectedValues(formData.clientName)
        : "",
      // TicketStage: getCheckboxSelectedValues(stage).toString(),
      ProductFormStage: selectedproductformstagesvalues
        ? convertArra2string(selectedproductformstagesvalues)
        : "",
        RequestStage: selectedrequestticketstagesvalues
        ? convertArra2string(selectedrequestticketstagesvalues)
        : "",
      ImplementationTiming: selectedImpltimingsvalues
        ? convertArra2string(selectedImpltimingsvalues)
        : "",
      ImplSLAFilter: selectedImplslasvalues
        ? convertArra2string(selectedImplslasvalues)
        : "",
      OverallSLAFilter: selectedoverallslasvalues
        ? convertArra2string(selectedoverallslasvalues)
        : "",
      AssignedTo: primaryTeamMember
        ? convertArra2string(primaryTeamMember)
        : "",
      Manager: TeamManager
      ? convertArra2string(TeamManager)
      : "",
      SortBy: sortValue != null ? sortValue : "",

      // SortBy:SelectedSortBy,
  // SLA: "",
      // CreatedDate: "",
      // AssignedTo: assignTo,
      // SortOrder: sortValue,
    };
  };
  const getSortbyData = (sortValue = null) => {
    setSortedCondition(sortValue != null ? sortValue : "");
    setsortvalueorder(sortValue != null ? sortValue : "");

    return {
      // PageNum: request?.list?.currentPage,
      // PageSize: request?.list?.pageSize,
      PageNum: 1,
      PageSize: 10,
      // RequestId: requestId,
      Product: ProductPagination ? ProductPagination : "",
      ProductAction: ProductActionPagination ? ProductActionPagination : "",
      // Client: "William Smith",
      Client: ClientNamePagination ? ClientNamePagination : "",
      // TicketStage: getCheckboxSelectedValues(stage).toString(),
      RequestStage: cardRequestStage ? cardRequestStage : "",
      ImplementationTiming: ImplementationTimingPagination
        ? ImplementationTimingPagination
        : "",
      ImplSLAFilter: ImplSLAFilterPagination
        ? ImplementationTimingPagination
        : "",
      OverallSLAFilter: OverallSLAFilterPagination
        ? OverallSLAFilterPagination
        : "",
      AssignedTo: AssignedToPagination ? AssignedToPagination : "",
      Manager: ManagerPagination ? ManagerPagination : "",
      SortBy: sortValue != null ? sortValue : "",
      SearchName: searchItem != null ? searchItem : "",

      // SortBy:SelectedSortBy,

      // SLA: "",
      // CreatedDate: "",
      // AssignedTo: assignTo,
      // SortOrder: sortValue,
    };
  };
  // const falseFilterData = () => {
  //   const filter = {
  //     ID: false,
  //     Name: true,
  //     Role: false,
  //     Sector: true,
  //     Code: false,
  //   };

  //   // const filtered = Object.assign(
  //   //   ...Object.keys(filter).map((k) => ({ [k]: true }))
  //   // );
  // };

  // falseFilterData();

  const saveFilterDropChange = (event) => {
    setSaveFilterDrop(event.target.value);
    if (event.target.value === 1) {
      //   console.log('kkkk',action)
      setFormData({
        ...formData,
        productTypes: [],
        primaryTeamMember: [],
        clientName: [],
        TeamManager: [],
      });

      setAction({ ...action, New: false, Modify: false, Delete: false });

      //   // setFormData({ ...formData, clientName: ""});
      let objforImpltimings = {};

      Impltimings &&
        // Object.keys(requestCount.counts.data).map((item) => {
        Impltimings.map((item) => (objforImpltimings[item.Name] = false));

      setImplTimingsstate(objforImpltimings);
      let objImplslas = {};

      Implslas &&
        // Object.keys(requestCount.counts.data).map((item) => {
        Implslas.map((item) => (objImplslas[item.Name] = false));

      setImplslastate(objImplslas);

      let objoverallslas = {};

      overallslas &&
        // Object.keys(requestCount.counts.data).map((item) => {
        overallslas.map((item) => (objoverallslas[item.Name] = false));

      setImploverallslastate(objoverallslas);
      let objticketstages = {};

      ticketstages &&
        // Object.keys(requestCount.counts.data).map((item) => {
        ticketstages.map((item) => (objticketstages[item.StageName] = false));

      setstagestate(objticketstages);
      return;
    }
    //   // setFormData({ ...formData, primaryTeamMember: ""});

    // setSaveFilterDrop(event.target.value);
    // const payload = { Id: event.target.value };
    getfilterbasedDetails(event.target.value);
  };

  // const saveFilterDropClose = () => {
  //   setOpenFilterDrop(false);
  // };

  // const saveFilterDropOpen = () => {
  //   setOpenFilterDrop(true);
  // };

  const saveApplyFilter = () => {
    setOpenDialogSaveFilter(true);
  };
  const deleteSuccess = () => {
    setIsSavedLoader(true);
    // setDeleteDialogSuccess(true)
    DeleteAfterSave(filteridfordelete);
    // setOpenDeleteDialogFlag(false);
  };
  function HandleAfterSave() {
    sideFilterDrawer();
    getAllfiltersLevels();
    setSaveSuccessDialog(false);
  }
  const DeleteAfterSave = (IdFilter) => {
    const payload = { Id: IdFilter, ActionBy: Number(actionbyId) };
    fetchDeletefilter(payload).then((res) => {
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

  const SideFilter = () => (
    <main aria-hidden="false" className={classes.rightDrawer}>
        <div className={classes.rightDrawerHeader}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
           <h1>Filter</h1>
           <FormControl className={classes.formControl}>
            <Select
              id="demo-controlled-open-select"
              value={saveFilterDrop || 1}
              onChange={saveFilterDropChange}
              className={classes.saveFilterDrop}
            >
              <MenuItem value={1}>None</MenuItem>
              {allFilters?.map((filterType) => (
                <MenuItem
                 key={filterType.Id}
                  value={filterType.Id}
                  className={classes.saveFilterDropItem}
                >
                  <div  key={filterType.Id} style={{ display: "flex" }}>
                    <PeopleIcon />
                    &nbsp;{filterType.FilterName}
                  </div>
                  {filterType.CanDelete && (
                    <DeleteOutlineIcon
                      button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDeleteDialogFlag(true);
                        setFilterNamefordelete(filterType.FilterName);
                        setFilteridfordelete(filterType.Id);
                      }}
                      color="error"
                    />
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            aria-label="delete"
            className={classes.margin}
            onClick={toggleDrawer(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        </div>
        <div className={classes.rightDrawerBody}>
        {loaderforfilter ? (
        <div>
          <Box display="flex" justifyContent="center">
            <CircularProgress size={40} color="primary" />
          </Box>
        </div>
      ) : (
        <div role="presentation">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormLabel component="legend" className={classes.legendBold}>
                Product Type
              </FormLabel>

              <Autocomplete
                multiple
                limitTags={2}
                id="product-type"
                className={classes.chipSelect}
                options={
                  [{ Id: 0, ProdName: "Select All" }, ...allProducts?.data] ||
                  []
                }
                value={productTypes}
                onChange={(e, newValue) => {
                  setSelectedProducts(newValue);
                  setFlagforIconproduct(newValue);
                }}
                disableCloseOnSelect
                getOptionLabel={(option) => option.ProdName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      indeterminate={
                        option.ProdName === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={
                            selectAllIconFlag.productTypes ? "primary" : ""
                          }
                        />
                      }
                      color="primary"
                    />
                    <div className={classes.checkboxLabel}>
                    {option.ProdName}
                    </div>
                  </li>
                )}
                renderTags={() => null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    //placeholder="Select product type here"
                    placeholder={
                      productTypes.length ? "" : "Select Customer Type"
                    }
                    className={classes.chipSelectInput}
                  />
                )}
              />
              <div>
                {productTypes?.map((v) => (
                  <Chip
                    key={v.ProdName}
                    label={v.ProdName}
                    onDelete={() => onDeleteProductChipsFilter(v.ProdName)}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend" className={classes.legendBold}>
                Product Action
              </FormLabel>
              <FormGroup style={{ flexDirection: "row" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={action.New}
                      onChange={actionTypeHandleChange}
                      name="New"
                      color="primary"
                    />
                  }
                  label="New"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={action.Modify}
                      onChange={actionTypeHandleChange}
                      name="Modify"
                      color="primary"
                    />
                  }
                  label="Modify"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={action.Delete}
                      onChange={actionTypeHandleChange}
                      name="Delete"
                      color="primary"
                    />
                  }
                  label="Delete"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend" className={classes.legendBold}>
                Client Name
              </FormLabel>
              <Autocomplete
                multiple
                limitTags={2}
                id="checkboxes-tags-demo"
                className={classes.autoComplete}
                options={
                  [
                    { Id: 0, nameclient: "Select All" },
                    ...clientforsecondname,
                  ] || []
                }
                value={clientName}
                onChange={(e, newValue) => {
                  setSelectedClientNames(newValue);
                  setFlagforIconclient(newValue);
                }}
                disableCloseOnSelect
                getOptionLabel={(option) => option.nameclient}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      indeterminate={
                        option.nameclient === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={selectAllIconFlag.clientName ? "primary" : ""}
                        />
                      }
                      color="primary"
                    />
                    {option.nameclient}
                  </li>
                )}
                renderTags={() => null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search by client name here"
                  />
                )}
              />
              <div>
                {clientName?.map((v) => (
                  <Chip
                    key={v.nameclient}
                    label={v.nameclient}
                    onDelete={() => onDeleteClientChipsFilter(v.nameclient)}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              {Impltimings?.length!==0 && (
                <FormLabel component="legend" className={classes.legendBold}>
                  Implementation Timing
                </FormLabel>
              )}
              {Impltimings &&
                // Object.keys(requestCount.counts.data).map((item) => {
                Impltimings.map((item,index) => {
                  return (
                    <FormGroup key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                          
                            checked={
                              implTimingsstate &&
                              implTimingsstate[`${item.Name}`]
                            }
                            onChange={implTimingTypeHandleChange}
                            name={item.Name}
                            color="primary"
                          />
                        }
                        label={item.Name}
                      />
                    </FormGroup>
                  );
                })}
            </Grid>
            <Grid item xs={12}>
              {Implslas?.length!==0&&
              <FormLabel component="legend" className={classes.legendBold}>
                Implementation SLA
              </FormLabel>}
              {Implslas &&
                // Object.keys(requestCount.counts.data).map((item) => {
                Implslas.map((item,index) => {
                  return (
                    <FormGroup key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                          
                            checked={
                              implslastate && implslastate[`${item.Name}`]
                            }
                            onChange={implslaTypeHandleChange}
                            name={item.Name}
                            color="primary"
                          />
                        }
                        label={item.Name}
                      />
                    </FormGroup>
                  );
                })}
            </Grid>
            <Grid item xs={12}>
              {overallslas?.length!==0&&<FormLabel component="legend" className={classes.legendBold}>
                Overall SLA
              </FormLabel>}
              {overallslas &&
                // Object.keys(requestCount.counts.data).map((item) => {
                overallslas.map((item,index) => {
                  return (
                    <FormGroup key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                         
                            checked={
                              imploverallslastate &&
                              imploverallslastate[`${item.Name}`]
                            }
                            onChange={overallslaTypeHandleChange}
                            name={item.Name}
                            color="primary"
                          />
                        }
                        label={item.Name}
                      />
                    </FormGroup>
                  );
                })}
            </Grid>
           
             
             <Grid item xs={12}>
              {ticketstages?.length!==0&&
              <FormLabel component="legend" className={classes.legendBold}>
                Product Form Stage
              </FormLabel>}
              {ticketstages &&
                // Object.keys(requestCount.counts.data).map((item) => {
                ticketstages.map((item,index) => {
                  return (
                    <FormGroup key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                         
                            checked={
                              implstagestate &&
                              implstagestate[`${item.StageName}`]
                            }
                            onChange={implstageTypeHandleChange}
                            name={item.StageName}
                            color="primary"
                          />
                        }
                        label={item.StageName}
                      />
                    </FormGroup>
                  );
                })}
            </Grid>
            <Grid item xs={12}>
              {ticketstages?.length!==0&&
              <FormLabel component="legend" className={classes.legendBold}>
                Request Stage
              </FormLabel>}
              {ticketstages &&
                // Object.keys(requestCount.counts.data).map((item) => {
                ticketstages.map((item,index) => {
                  return (
                    <FormGroup key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                         
                            checked={
                              implrequeststagestate &&
                              // implstagestate[`${item.StageName}request`]
                              implrequeststagestate[`${item.StageName}`]
                            }
                            onChange={implrequeststageTypeHandleChange}
                            // name={`${item.StageName}request`}
                            name={item.StageName}
                            color="primary"
                          />
                        }
                        label={item.StageName}
                      />
                    </FormGroup>
                  );
                })}
              {/* <ChatIcon/> */}
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend" className={classes.legendBold}>
                Assigned to
              </FormLabel>
              <Autocomplete
                multiple
                limitTags={2}
                id="assign-to"
                className={classes.autoComplete}
                options={
                  [{ Id: 0, AgentName: "Select All" }, ...allPodMembers] || []
                }
                value={primaryTeamMember}
                onChange={(e, newValue) => {
                  setSelectedPrimaryTeamMembers(newValue);

                  setFlagforprimaryIcon(newValue);
                }}
                disableCloseOnSelect
                getOptionLabel={(option) => option.AgentName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      indeterminate={
                        option.AgentName === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={
                            selectAllIconFlag.primaryTeamMember ? "primary" : ""
                          }
                        />
                      }
                      color="primary"
                    />
                    {option.AgentName}
                  </li>
                )}
                renderTags={() => null}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select member here" />
                )}
              />
              <div>
                {primaryTeamMember?.map((v) => (
                  <Chip
                    key={v.AgentName}
                    label={v.AgentName}
                    onDelete={() => onDeletememberChipsFilter(v.AgentName)}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend" className={classes.legendBold}>
              Team Manager
              </FormLabel>
              {/* <Autocomplete
                multiple
                limitTags={2}
                id="assign-to"
               className={classes.autoComplete}
                options={
                  [{ Id: 0, AgentName: "Select All" }, ...allPodMembers] || []
                }
                value={primaryTeamMember}
                onChange={(e, newValue) => {
                  setSelectedPrimaryTeamMembers(newValue);

                  setFlagforprimaryIcon(newValue);
                }}
                disableCloseOnSelect
                getOptionLabel={(option) => option.AgentName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      indeterminate={
                        option.AgentName === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={
                            selectAllIconFlag.primaryTeamMember ? "primary" : ""
                          }
                        />
                      }
                      color="primary"
                    />
                    {option.AgentName}
                  </li>
                )}
                renderTags={() => null}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select member here" />
                )}
              />
              <div>
                {primaryTeamMember?.map((v) => (
                  <Chip
                    key={v.AgentName}
                    label={v.AgentName}
                    onDelete={() => onDeletememberChipsFilter(v.AgentName)}
                  />
                ))}
              </div>
            </Grid> */}
            {/* <Grid item xs={12}>
              <FormLabel component="legend" className={classes.legendBold}>
                Team Manager
              </FormLabel>
              <Autocomplete
                {...defaultProps}
                id="copy-form"
                className={classes.autoComplete}
                //value={membersList||[]}
                value={teammanagerName || []}
                onChange={handleChangemanagers}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={
                      teammanagerName.length ? [] : "Select Team Manager"
                    }
                  />
                )}
              />
            </Grid> */}
            <Autocomplete
                multiple
                limitTags={2}
                id="copy-form"
                className={classes.autoComplete}
                options={
                  [{ Id: 0, Name: "Select All" }, ...allTeamManagers] || []
                }
                value={TeamManager||[]}
                onChange={(e, newValue) => {
                  setSelectedTeamManagers(newValue);

                  setFlagformanagerIcon(newValue);
                }}
                disableCloseOnSelect
                getOptionLabel={(option) => option.Name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      indeterminate={
                        option.Name === "Select All" ? true : false
                      }
                      indeterminateIcon={
                        <IndeterminateCheckBoxIcon
                          color={
                            selectAllIconFlag.TeamManager ? "primary" : ""
                          }
                        />
                      }
                      color="primary"
                    />
                    {option.Name}
                  </li>
                )}
                renderTags={() => null}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Team Manager" />
                )}
              />
              <div>
                {TeamManager?.map((v) => (
                  <Chip
                    key={v.Name}
                    label={v.Name}
                    onDelete={() => onDeletemanagerChipsFilter(v.Name)}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
      )}
        </div>
        <div className={classes.rightDrawerFooter}>
        <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btnApply}
                // onClick={toggleDrawer(false)}
                onClick={() => sideFilterDrawer()}
              >
                Apply
              </Button>

              {/* <Button onClick={()=>{console.log(assigneddata,Productdata)}}>jjjjj</Button> */}
              <Button
                variant="outlined"
                color="primary"
                className={classes.btnApply}
                // onClick={toggleDrawer(false)}
                onClick={() => saveApplyFilter()}
              >
                Save Filter & Apply
              </Button>
              <Button
                color="primary"
                className={classes.btnApply}
                onClick={toggleDrawer(false)}
                //onClick={() => sideFilterDrawer()}
              >
                Cancel
              </Button>
            </Grid>
        </div>
    </main>

  );

  const collapseTableRow = (collapse) => {
    return (
      <div className={classes.collapsDiv} key={collapse.id}>
        <span className={classes.collapsContentHeading}>
          {collapse.label} :{" "}
        </span>
        <span className={classes.collapsContentValue}>
          {collapse.format ? collapse.format(value) : value}
        </span>
      </div>
    );
  };

  const saveFilterAsDialogMessage = (i) => {
    return (
      <>
        <Grid item xs={12}>
          <div className={classes.saveFilterDialogHeading}>
            Filter Name{" "}
            <span className={classes.selectLimit}>
              (Max 50 characters are allowed)
            </span>{" "}
            <span className={classes.star}>*</span>
          </div>
          <TextFieldInput
            placeholder="Enter Name of the Filter"
            name="filtername"
            onChange={handleFormData}
            margin="dense"
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid item xs={12}>
          <div
            className={classes.saveFilterDialogHeading}
            style={{ marginTop: "20px" }}
          >
            Type of Filter
          </div>
          <div style={{ marginTop: "10px" }}>
            <RadioGroup
              onChange={handleChangeFilter}
              value={FilterValue || "change"}
              row
              aria-label="end"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="set"
                control={<Radio color="primary" size="small" />}
                label="Public"
              />
              <FormControlLabel
                value="change"
                control={<Radio color="primary" size="small" />}
                label="Private"
              />
            </RadioGroup>
          </div>
        </Grid>
      </>
    );
  };

  return (
    
    <Fragment>
     
      <div>
      {linkFlag && (
          <a
            href="/dashboard"
            style={{ textDecoration: "none", color: "#0080FF" }}
          >
            <div> {backArrow} Back to All Requests</div>
          </a>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <h1>
            {dashboardName} - {request.list.totalCount}
          </h1>
          <div>
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
                  // setSearched(e.target.value);
                }}
              />
            </span>
            <Button
              className={classes.btnControl}
              variant="outlined"
              color="primary"
              startIcon={<SortIcon />}
              onClick={sortHandleClick}
            >
              Sort by
            </Button>
            

            <Popover
              id={id}
              open={open}
              anchorEl={sort}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              aria-hidden="false"
            >
              <main>
              <FormControl component="fieldset" className={classes.formControl}>
                <h1 className={classes.sortHeading}>Sorting</h1>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleChange}
                  aria-disabled="true"
                >
                  <FormControlLabel
                    value="created_date_asc"
                    control={<Radio color="primary" />}
                    className={classes.sortBackgroud}
                    label={
                      <>
                        {"Create Date & time"} {upwardArrow}{" "}
                      </>
                    }
                  />
                  <FormControlLabel
                    value="created_date_desc"
                    control={<Radio color="primary" />}
                    className={classes.sortBackgroud}
                    label={
                      <>
                        {"Create Date & time"} {downwardArrow}{" "}
                      </>
                    }
                  />
                  <FormControlLabel
                    value="request iD asc"
                    control={<Radio color="primary" />}
                    className={classes.sortBackgroud}
                    label={
                      <>
                        {"Request ID"} {upwardArrow}{" "}
                      </>
                    }
                  />
                  <FormControlLabel
                    value="request iD desc"
                    control={<Radio color="primary" />}
                    className={classes.sortBackgroud}
                    label={
                      <>
                        {"Request ID"} {downwardArrow}{" "}
                      </>
                    }
                  />
                  <FormControlLabel
                    value="product action asc"
                    control={<Radio color="primary" />}
                    className={classes.sortBackgroud}
                    label={
                      <>
                        {"Product Action"} {upwardArrow}{" "}
                      </>
                    }
                  />
                  <FormControlLabel
                    value="product action desc"
                    control={<Radio color="primary" />}
                    className={classes.sortBackgroud}
                    // label="Date Created"
                    label={
                      <>
                        {"Product Action"} {downwardArrow}{" "}
                      </>
                    }
                  />
                    <FormControlLabel
                    value="request stage asc"
                    control={<Radio color="primary" />}
                    className={classes.sortBackgroud}
                    // label="Date Created"
                    label={
                      <>
                        {"Request Stage"} {upwardArrow}{" "}
                      </>
                    }
                  />
                     <FormControlLabel
                    value="request stage desc"
                    control={<Radio color="primary" />}
                    className={classes.sortBackgroud}
                    // label="Date Created"
                    label={
                      <>
                        {"Request Stage"} {downwardArrow}{" "}
                      </>
                    }
                  />
                </RadioGroup>
              </FormControl>
              </main>
            </Popover>
            <Button
              onClick={toggleDrawer(true)}
              className={classes.btnControl}
              variant="outlined"
              color="primary"
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
            

            <SideDrawer
              open={drawerOpen}
              onClick={toggleDrawer(false)}
              anchor={"right"}
              content={SideFilter()}
              classes={classes.rightDrawer}
            />
          </div>
        </Box>
        {
          clearallValidation() === false && (
            <div className={classes.applyFilter}>
              Applied Filters:
              <span className={classes.applyFilterChip}>
                {
                  filterList &&
                    Object.keys(filterList).map((item) =>
                      Array.isArray(filterList[item])
                        ? filterList[item].map(
                            (ele) =>
                              ele && (
                                <Chip
                                  
                                  label={ele}
                                  //className={classes.applyFilterChip}
                                  color="primary"
                                  onDelete={onDeleteProductTypeChip(item, ele)}
                                />
                              )
                          )
                        : typeof filterList[item] != "undefined" && (
                            <Chip
                              // key={p.Id}
                              label={filterList[item]}
                              //className={classes.applyFilterChip}
                              color="primary"
                              onDelete={onDeleteProductTypeChip(item)}
                            />
                          )
                    )
                  // : null
                }

                {clearallValidation() === false && (
                  <Button
                    onClick={(toggleDrawer(true), clearallAction)}
                    className={classes.clearBtn}
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    Clear All
                  </Button>
                  
                )}
              </span>
            </div>
          )
          // : null
        }
      </div>
      <div className={classes.dashboardCard}>
        {requestCount.counts.data &&
          // Object.keys(requestCount.counts.data).map((item) => {
          requestCount.counts.data.map((item) => {
            return (
              item.StageCount > 0 && (
                <DashboardCard
                  // requestType={item}
                  // label={item}
                  // count={requestCount.counts.data?.[item]}
                  key={ item.Id}
                  requestType={item.StageName}
                  label={item.StageName}
                  count={item.StageCount}
                  onClick={() =>
                    dashboardNameChange(
                      item.Id,
                      // request.list.data,
                      item.StageName,
                      `${item.StageName} Requests`
                    )
                  }
                />
              )
            );
          })}
      </div>

      <Box>
        
        {(request && request.list && request.list.isLoading) || isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <>
            {openDialogSaveFilter && (
              <ViewDialog
                name="auditrail"
                title={"Save Filter As"}
                message={saveFilterAsDialogMessage()}
                showCancelBtn={true}
                showOkBtn={false}
                showSaveApplyBtn={true}
                turnText={true}
                setOpen={setOpenDialogSaveFilter}
                // loading={isLoading}
                onConfirm={filterSave}
                showdisableBtn={
                  formData.filtername.length ? false : true || true
                }
                loading={flagforloading}
              />
            )}
            {saveSuccessDialog && (
              <ConfirmDialog
                name="auditrail"
                title={"Saved!"}
                successIcon={true}
                message={`${formData.filtername} saved sucessfully!`}
                saveText={"Okay"}
                onSave={HandleAfterSave}
                showSaveBtn={true}
                showCancelBtn={false}
                showOkBtn={false}
                setOpen={setSaveSuccessDialog}

                //onCancel={handleSaveCancel}
              />
            )}
            <StyledTable
              rows={request && request.list && request.list.data}
              columns={columns}
              pageNumber={request && request.list && request.list.currentPage}
              pageSize={request && request.list && request.list.pageSize}
              totalCount={request && request.list && request.list.totalCount}
              totalPages={request && request.list && request.list.totalPages}
              handlePaginationBackward={handlePaginationBackward}
              handlePaginationForward={handlePaginationForward}
              open={openTableRow}
              collapseData={columnsCollaps}
              prp={collapseTableRow}
              name={"dash"}
              sortparm={true}
              setSortedCondition={setSortedCondition}
              setFilters={setFilters}
              searchItem={searchItem}
              cardProductStage={cardProductStage}
              cardRequestStage={cardRequestStage}
              AssignedToPagination={AssignedToPagination}
              ClientNamePagination={ClientNamePagination}
              ImplSLAFilterPagination={ImplSLAFilterPagination}
              ImplementationTimingPagination={ImplementationTimingPagination}
              ManagerPagination={ManagerPagination}
              OverallSLAFilterPagination={OverallSLAFilterPagination}
              ProductPagination={ProductPagination}
              ProductActionPagination={ProductActionPagination}
              sortvalueorder={sortvalueorder}
              setsortvalueorder={setsortvalueorder}
            />

            {openDeleteDialogFlag === true && (
              <ConfirmDialog
                name="delete"
                onConfirm={deleteSuccess}
                confirmText={"Delete"}
                title={"Are You Sure ?"}
                message={`Do you really want to delete ${filterNamefordelete}?`}
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
                message={`${filterNamefordelete} deleted sucessfully!`}
                //open={openDeleteDialogFlag}
                setOpen={deleteDialogSuccess}
                warningIcon={true}
                showCancelBtn={false}
              />
            )}
          </>
        )}
      </Box>
    </Fragment>
  );
}
