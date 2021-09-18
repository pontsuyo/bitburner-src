// Root React Component for the Corporation UI
import React, { useState, useEffect } from "react";

import makeStyles from "@mui/styles/makeStyles";
import { numeralWrapper } from "../../ui/numeralFormat";
import { Reputation } from "./Reputation";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Fab from "@mui/material/Fab";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { colors } from "./Theme";
import { Settings } from "../../Settings/Settings";
import { use } from "../../ui/Context";
import { Page } from "../../ui/Router";

interface IProps {
  save: () => void;
}

function Intelligence(): React.ReactElement {
  const player = use.Player();
  const classes = useStyles();
  if (player.intelligence === 0) return <></>;
  return (
    <TableRow>
      <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
        <Typography classes={{ root: classes.int }}>Int&nbsp;</Typography>
      </TableCell>
      <TableCell align="right" classes={{ root: classes.cell }}>
        <Typography classes={{ root: classes.int }}>{numeralWrapper.formatSkill(player.intelligence)}</Typography>
      </TableCell>
    </TableRow>
  );
}

function Work(): React.ReactElement {
  const player = use.Player();
  const router = use.Router();
  const classes = useStyles();
  if (!player.isWorking || player.focus) return <></>;
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" colSpan={2} classes={{ root: classes.cellNone }}>
          <Typography>Work&nbsp;in&nbsp;progress:</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" colSpan={2} classes={{ root: classes.cellNone }}>
          <Typography>+{Reputation(player.workRepGained)} rep</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" align="center" colSpan={2} classes={{ root: classes.cellNone }}>
          <Button
            onClick={() => {
              player.startFocusing();
              router.toWork();
            }}
          >
            Focus
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

const useStyles = makeStyles({
  cellNone: {
    borderBottom: "none",
    padding: 0,
    margin: 0,
  },
  cell: {
    padding: 0,
    margin: 0,
  },
  hp: {
    color: colors.hp,
  },
  money: {
    color: colors.money,
  },
  hack: {
    color: colors.hack,
  },
  combat: {
    color: colors.combat,
  },
  cha: {
    color: colors.cha,
  },
  int: {
    color: colors.int,
  },
  nobackground: {
    backgroundColor: "#0000",
  },
});

export function CharacterOverview({ save }: IProps): React.ReactElement {
  const player = use.Player();
  const router = use.Router();

  if (router.page() === Page.BitVerse) return <></>;

  const setRerender = useState(false)[1];
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setRerender((old) => !old), 600);
    return () => clearInterval(id);
  }, []);

  const classes = useStyles();
  return (
    <div style={{ position: "fixed", top: 0, right: 0, zIndex: 1500 }}>
      <Box display="flex" justifyContent="flex-end" flexDirection={"column"}>
        <Collapse in={open}>
          <Paper square>
            <Box m={1}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.hp }}>HP&nbsp;</Typography>
                    </TableCell>
                    <TableCell align="right" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.hp }}>
                        {numeralWrapper.formatHp(player.hp)}&nbsp;/&nbsp;{numeralWrapper.formatHp(player.max_hp)}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.money }}>Money&nbsp;</Typography>
                    </TableCell>
                    <TableCell align="right" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.money }}>
                        {numeralWrapper.formatMoney(player.money.toNumber())}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
                      <Typography classes={{ root: classes.hack }}>Hack&nbsp;</Typography>
                    </TableCell>
                    <TableCell align="right" classes={{ root: classes.cell }}>
                      <Typography classes={{ root: classes.hack }}>
                        {numeralWrapper.formatSkill(player.hacking_skill)}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.combat }}>Str&nbsp;</Typography>
                    </TableCell>
                    <TableCell align="right" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.combat }}>
                        {numeralWrapper.formatSkill(player.strength)}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.combat }}>Def&nbsp;</Typography>
                    </TableCell>
                    <TableCell align="right" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.combat }}>
                        {numeralWrapper.formatSkill(player.defense)}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.combat }}>Dex&nbsp;</Typography>
                    </TableCell>
                    <TableCell align="right" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.combat }}>
                        {numeralWrapper.formatSkill(player.dexterity)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
                      <Typography classes={{ root: classes.combat }}>Agi&nbsp;</Typography>
                    </TableCell>
                    <TableCell align="right" classes={{ root: classes.cell }}>
                      <Typography classes={{ root: classes.combat }}>
                        {numeralWrapper.formatSkill(player.agility)}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.cha }}>Cha&nbsp;</Typography>
                    </TableCell>
                    <TableCell align="right" classes={{ root: classes.cellNone }}>
                      <Typography classes={{ root: classes.cha }}>
                        {numeralWrapper.formatSkill(player.charisma)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <Intelligence />
                  <Work />

                  <TableRow>
                    <TableCell align="center" colSpan={2} classes={{ root: classes.cellNone }}>
                      <Button color={Settings.AutosaveInterval !== 0 ? "primary" : "secondary"} onClick={save}>
                        SAVE
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Collapse>
        <Box display="flex" justifyContent="flex-end">
          <Fab classes={{ root: classes.nobackground }} onClick={() => setOpen((old) => !old)}>
            <VisibilityOffIcon color="primary" />
          </Fab>
        </Box>
      </Box>
    </div>
  );
}
