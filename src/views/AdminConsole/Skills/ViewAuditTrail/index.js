import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleTable from "./../../../../components/Table/SimpleTable";
import { fetchAuditTrail } from "../../../../redux/actions/viewAuditTrail";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function ViewAuditTrail(props) {
  const selectedRowID = useSelector((state) => state.rowIdSelected?.selectedrow) || 0;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const rowAuditData = useSelector(
  //   (state) => state.ViewAuditTrail?.auditTrail?.data
  // );

  useEffect(() => {
    getAuditTrail();
    //Below comment is to disable warning explicitly, since there is no other workaround.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAuditTrail = () => {
    let payload = {
      ...props.pageData,
      rowId: selectedRowID,
      pageId: props.pageID,
    };
    setIsLoading(true);
    dispatch(fetchAuditTrail(payload)).then(() => {
      setIsLoading(false);
    });
  };
  const store = useSelector((state) => {
    return state;
  });
  const { viewAuditTrail } = store;
  const columns = [
    {
      id: "CreatedDateTime",
      label: "Date & Time",
      minWidth: 120,
      isClickable: true,
      isSorting: true,
    },
    {
      id: "UserId",
      label: "User ID",
      minWidth: 120,
      isClickable: true,
      isSorting: false,
    },
    {
      id: "Name",
      label: "Name",
      minWidth: 120,
      isClickable: true,
      isSorting: false,
    },
    {
      id: "Change",
      label: "Change",
      minWidth: 120,
      isClickable: true,
      isSorting: false,
    },
  ];

  return (
    <>
    {
      (viewAuditTrail && viewAuditTrail.auditTrail && viewAuditTrail.auditTrail.isLoading) || isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : <SimpleTable 
      rows={viewAuditTrail && viewAuditTrail.auditTrail && viewAuditTrail.auditTrail.data} 
      columns={columns} 
  />
    }
    </>
  )
}
