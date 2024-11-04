import { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Button,
    TextField,
    IconButton,
    Grid2,
    Typography,
    Box,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import PropTypes from "prop-types";
import {observer} from "mobx-react-lite";

const TeamList = observer(({ teams, onEditNameTeam, onDeleteTeam, onEditMember, onDeleteMember }) => {
    const [editingTeamId, setEditingTeamId] = useState(null);
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [newTeamName, setNewTeamName] = useState('');
    const [newMemberName, setNewMemberName] = useState('');

    const handleEditTeam = (teamId) => {
        setEditingTeamId(teamId);
        setNewTeamName(teams.find(team => team.id === teamId).name);
    };

    const handleSaveTeam = (teamId) => {
        onEditNameTeam(teamId, newTeamName);
        setEditingTeamId(null);
    };

    const handleEditMember = (teamId, memberId) => {
        setEditingMemberId(memberId);
        setNewMemberName(teams.find(team => team.id === teamId).members.find(member => member === memberId));
    };

    const handleSaveMember = (teamId, memberId) => {
        onEditMember(teamId, memberId, newMemberName);
        setEditingMemberId(null);
    };

    return (
        <Box sx={{ margin: '10px'}}>
            <Grid2 container spacing={2}>
                {teams.map((team) => (
                    <Grid2 xs={12} key={team.id} sx={{ width: '100%' }}>
                        <Box sx={{ border: '1px solid #ccc', padding: '8px', borderRadius: '8px' }}>
                            <Typography variant="h6" gutterBottom>
                                {editingTeamId === team.id ? (
                                    <TextField
                                        value={newTeamName}
                                        onChange={(e) => setNewTeamName(e.target.value)}
                                        onBlur={() => handleSaveTeam(team.id)}
                                        autoFocus
                                    />
                                ) : (
                                    team.name
                                )}
                            </Typography>
                            <List>
                                {team.members.map((member) => (
                                    <ListItem key={member} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <ListItemText
                                            primary={
                                                editingMemberId === member ? (
                                                    <TextField
                                                        value={newMemberName}
                                                        onChange={(e) => setNewMemberName(e.target.value)}
                                                        onBlur={() => handleSaveMember(team.id, member)}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    member
                                                )
                                            }
                                        />
                                        <Box>
                                            <IconButton onClick={() => handleEditMember(team.id, member)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onDeleteMember(team.id, member)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                                <Button variant="contained" color="primary" onClick={() => handleEditTeam(team.id)} sx={{ marginRight: '8px'}}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => onDeleteTeam(team.id)}>
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
});

TeamList.propTypes = {
    teams: PropTypes.array,
    onEditNameTeam: PropTypes.func,
    onDeleteTeam: PropTypes.func,
    onEditMember: PropTypes.func,
    onDeleteMember: PropTypes.func,
};

export default TeamList;
