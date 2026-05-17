import Player from '../models/playerModel.js'; // Adjust path as needed

/**
 * @desc    Get all players for the admin dashboard (Requirement 6.1.1)
 * @route   GET /api/admin/players
 */
export const getAllPlayers = async (req, res) => {
    try {
        // Select only the fields required for the admin view to save bandwidth
        const players = await Player.find({}).select('username email isPremium isActive');
        res.status(200).json(players);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ message: 'Server error while fetching players.' });
    }
};

/**
 * @desc    Deactivate or reactivate a player account (Requirement 6.2.1)
 * @route   PUT /api/admin/players/:id/toggle-status
 */
export const togglePlayerStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const player = await Player.findById(id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found.' });
        }

        // Toggle the boolean status
        player.isActive = !player.isActive;
        await player.save();

        res.status(200).json({
            message: `Player has been ${player.isActive ? 'activated' : 'deactivated'}.`,
            isActive: player.isActive
        });
    } catch (error) {
        console.error('Error toggling player status:', error);
        res.status(500).json({ message: 'Server error while updating player status.' });
    }
};