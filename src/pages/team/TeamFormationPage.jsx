import TeamForm from '../../components/team/form/TeamForm.jsx';
import TeamList from '../../components/team/list/TeamList.jsx';
import TeamMemberInput from "../../components/team/member/TeamMemberInput.jsx";
import { appController } from '../../controllers/app/AppController.jsx';
import { Box, Typography, Paper, Grid2 } from '@mui/material';
import { observer } from 'mobx-react-lite';

const TeamFormationPage = observer(() => {
    const { teams } = appController.store;

    const handleAddTeam = (team) => {
        appController.addTeam(team);
    };

    const handleEditNameTeam = (teamId, updatedTeam) => {
        appController.editNameTeam(teamId, updatedTeam);
    };

    const handleDeleteTeam = (teamId) => {
        appController.deleteTeam(teamId);
    };

    const handleDeleteMember = (teamId, member) => {
        appController.deleteMember(teamId, member);
    };

    const handleEditMember = (teamId, member, newMember) => {
        appController.editMember(teamId, member, newMember);
    };

    const handleAddMember = (teamId, memberName) => {
        const team = teams.find(team => team.id === teamId);
        if (team && memberName) {
            appController.updateTeam(teamId, { members: [...team.members, memberName] });
        }
    };

    return (
        <Box sx={{ width: '100%', mx: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Team Formation
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={6} item={'true'}>
                    <Grid2 container spacing={2} direction="column">
                        <Grid2 item={'true'}>
                            <Paper elevation={3} sx={{ p: 3, width: '24rem'}}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Add New Team
                                </Typography>
                                <TeamForm onAddTeam={handleAddTeam} />
                            </Paper>
                        </Grid2>
                        <Grid2 item={'true'}>
                            <Paper elevation={3} sx={{ p: 3, width: '24rem'}}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Add Team Members
                                </Typography>
                                {teams.map((team) => (
                                    <Box key={team.id} sx={{ mb: 2 }}>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            {team.name}
                                        </Typography>
                                        <TeamMemberInput onAddMember={handleAddMember} teamId={team.id} />
                                    </Box>
                                ))}
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 xs={12} md={6} item={'true'}>
                    <Paper elevation={3} sx={{ p: 3, width: '32rem' }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Team List
                        </Typography>
                        <TeamList
                            teams={teams}
                            onEditNameTeam={handleEditNameTeam}
                            onDeleteTeam={handleDeleteTeam}
                            onEditMember={handleEditMember}
                            onDeleteMember={handleDeleteMember}
                        />
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
});

export default TeamFormationPage;