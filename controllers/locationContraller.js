

const createLocation = async (req, res) => {
    const { location, code, name } = req.body;

    try {
        const locationExists = await Location.findOne({ location })
        if (locationExists) {
            return res.status(400).json({ message: 'bank management already exists' })
        }

        const newLocation = await Location.create(
            {
                location: location,
                model: model,
                name: name,
            }

            const login = await newLocation.save();
        )
    } catch (error) {

}


}