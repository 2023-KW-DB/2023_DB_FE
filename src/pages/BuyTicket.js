import { Box, Button, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";
import { useSelector } from "react-redux";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const mock = [
  {
    id: 1,
    ticket_price: 5500,
  },
  {
    id: 2,
    ticket_price: 11000,
  },
];

const BuyTicket = () => {
  const [ticketList, setTicketList] = useState(mock);
  const user = useSelector((state) => state.user);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/get-all-ticket", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setTicketList(jsonData.result);
      } catch (e) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, []);

  useEffect(() => {
    setMoney(user.total_money);
  }, [user]);

  const buyTicketHandler = (id) => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/users/purchase-ticket?userId=${user.id}&ticketId=${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("티켓 구매에 실패했습니다.");
        }
        const jsonData = await response.json();
        alert("티켓 구매에 성공했습니다.");
        for (let i = 0; i < ticketList.length; i++) {
          if (ticketList[i].id === id) {
            setMoney(money - ticketList[i].ticket_price);
            break;
          }
        }
      } catch (e) {
        alert("티켓 구매에 실패했습니다.");
      }
    })();
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        이용권 구매
      </Typography>
      <Box sx={{ display: "flex", py: 1 }}>
        <AttachMoneyIcon sx={{ mr: 1 }} /> 보유 금액 : {money}&nbsp;원
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell sx={{ maxWidth: "25px"}} >
                <Typography variant="span">번호</Typography>
              </TableCell> */}
              <TableCell sx={{ alignItems: "center", textAlign: "center" }}>
                <Typography variant="span">가격</Typography>
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: "200px",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="span">구매</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketList && ticketList.length > 0 ? (
              <>
                {ticketList.map((row, index) => (
                  <TableRow>
                    {/* <TableCell>
                      <Typography variant="span">{row.id}</Typography>
                    </TableCell> */}
                    <TableCell sx={{ alignItems: "center", textAlign: "center" }}>
                      <Typography variant="span">{row.ticket_price}</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "200px",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Button variant="contained" color="primary" onClick={() => buyTicketHandler(row.id)}>
                        <Redeem /> 구매하기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="span">데이터가 없습니다.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BuyTicket;
