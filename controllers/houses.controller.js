const { Op } = require('sequelize');
const House = require('../models/house.model');
const HouseImage = require('../models/house_image_url.model');
const SavedHouse = require('../models/saved_homes.model');
const RequestedHouse = require('../models/requested_house_type.model');



//limit
var limit = 10;

exports.getHouses = async (req, res, next) => {
    var { offset } = req.query;


    if (!offset || offset < 1) {
        offset = 1;
    }

    try {
        const houses = await House.findAll(
            {
                where: { isActive: true },
                offset: (offset - 1) * limit,
                limit: limit,
                order: [['createdAt', 'DESC']]
            }
        );

        console.log(houses)

        res.status(200).json({ houses: houses });
    } catch (e) {
        next(e);
    }
}

exports.getHouseDetails = async (req, res, next) => {
    const { houseId } = req.query;

    try {
        const house = await House.findByPk(houseId);
        res.status(200).json({ house: house });
    } catch (e) {
        next(e);
    }
}

exports.getHouseImages = async (req, res, next) => {
    const { houseId } = req.query;

    try {
        const houseImages = await HouseImage.findAll({ where: { houseId: houseId } });

        res.status(200).json({ houseImages: houseImages });
    } catch (e) {
        next(e);
    }
}

exports.getSavedHouses = async (req, res, next) => {
    const user = res.locals.user;
    var { offset } = req.query;

    // var limit = 2

    if (!offset || offset < 1) {
        offset = 1;
    }

    try {
        const savedHouses = await SavedHouse.findAll({
            where: { userId: user.id },
            include: House,
            offset: (offset - 1) * limit,
            limit: limit,
            order: [['createdAt', 'DESC']]
        });
        const count = await SavedHouse.count({
            where: { userId: user.id },
            include: House,
           
        });
        

        res.status(200).json({ savedHouses: savedHouses,total:count });
    } catch (e) {
        next(e);
    }
}

exports.saveHouse = async (req, res, next) => {
    const { houseId } = req.query;
    const user = res.locals.user;

    try {
        const savedHouse = await SavedHouse.findOne({ where: { [Op.and]: [{ houseId: houseId }, { userId: user.id }] } });

        if (!savedHouse) {
            const house = await House.findByPk(houseId);
            await SavedHouse.create({
                houseId: house.id,
                userId: user.id,
            });
        }

        console.log(savedHouse);

        res.status(200).json({ message: 'House saved!' });
    } catch (e) {
        next(e);
    }
}

exports.removeSavedHouse = async (req, res, next) => {
    const { houseId } = req.query;
    const user = res.locals.user;

    try {
        const savedHouse = await SavedHouse.findOne({ where: { [Op.and]: [{ houseId: houseId }, { userId: user.id }] } });

        if (savedHouse) {
            await savedHouse.destroy();
        }

        res.status(200).json({ message: 'House removed from saved list!' });
    } catch (e) {
        next(e);
    }
}

exports.search = async (req, res, next) => {
    const queries = req.query.search;
    const offset=req.query.offset;
    // limit=20;
    
    if (!offset || offset < 1) {
        offset = 1;
    }

    var queriesList = queries.split(" ");
 let totalCount = 0;
    // var searchResults = [];

///use set object to remove duplication
  const searchResults = new Set();
  
  ///new set object for calculating total searched Homes without limit
  const cousetSearchResult=new Set();

    console.log(queriesList);

    try {
         var searchQuery;
        for (const index in queriesList) {
          searchQuery = '%' + queriesList[index].toLowerCase() + '%';
            const values = await House.findAll({
                where: {
                    [Op.or]: [
                        { city: { [Op.like]: searchQuery } },
                        { subcity: { [Op.like]: searchQuery } },
                        { addressName: { [Op.like]: searchQuery } },
                        { houseType: { [Op.like]: searchQuery } },
                        { marketStatus: { [Op.like]: searchQuery } },
                    ]
                },
                offset: (offset - 1) * limit,
                limit: limit,
                order: [['createdAt', 'DESC']]
            });

            // if (values.length >= 1) {
            //     searchResults.push.apply(searchResults, values);
            // }
            
            
            
            // Add stringified value to the Set
        for (const value of values) {
        searchResults.add(JSON.stringify(value)); 
      }
       
       
       ////search home with out limit
           const countQuery = await House.findAll({
                where: {
                    [Op.or]: [
                        { city: { [Op.like]: searchQuery } },
                        { subcity: { [Op.like]: searchQuery } },
                        { addressName: { [Op.like]: searchQuery } },
                        { houseType: { [Op.like]: searchQuery } },
                        { marketStatus: { [Op.like]: searchQuery } },
                    ]
                },
               
            });

////add it to the set to remove duplication
       for (const countQueryOne of countQuery) {
        cousetSearchResult.add(JSON.stringify(countQueryOne)); // Add stringified value to the Set
      }
      const count = await House.count(countQuery);
      totalCount += count;
    }
    

       /////total without limit and find its  length for pagination purpose 
const countarrayResults = Array.from(cousetSearchResult, jsonString => JSON.parse(jsonString));        
const newTotal=countarrayResults.length;
    
// Convert Set to an array of JavaScript objects
const arrayResults = Array.from(searchResults, jsonString => JSON.parse(jsonString));        
        

        res.status(201).json({ searchresults: arrayResults,total:newTotal });
    }
    catch (e) {
        next(e);
    }
}

exports.filteredHouses = async (req, res, next) => {
    let { houseType, bedrooms, bathrooms, furnishingType, minPrice, maxPrice, minArea, maxArea, serviceType, subcity, offset } = req.query;

    if (!offset || offset < 1) {
        offset = 1;
    }
    

    try {
        
        const filteredHouses = await House.findAll(
            {
                where: {
                    [Op.and]: [
                 houseType && houseType !== 'Any' ? { houseType: houseType } : null,
            bedrooms && bedrooms !== 'Any' ? { bedrooms: bedrooms } : null,
            bathrooms && bathrooms !== 'Any' ? { bathrooms: bathrooms } : null,
            subcity && subcity !== 'Any' ? { subcity: subcity } : null,
            furnishingType && furnishingType !== 'Any' ? { furnishingStatus: furnishingType } : null,
            
    (minPrice && maxPrice) && (minPrice !== 'Any' && maxPrice !== 'Any') ? { price: { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] } } :
      minPrice === 'Any' && maxPrice !== 'Any' ? { price: { [Op.lte]: parseFloat(maxPrice) } } :
      minPrice !== 'Any' && maxPrice === 'Any' ? { price: { [Op.gte]: parseFloat(minPrice) } } : null,
      
       (minArea && maxArea) && (minArea !== 'Any' && maxArea !== 'Any') ? { areaSize: { [Op.between]: [parseFloat(minArea), parseFloat(maxArea)] } } :
      minArea === 'Any' && maxArea !== 'Any' ? { areaSize: { [Op.lte]: parseFloat(maxArea) } } :
      minArea !== 'Any' && maxArea === 'Any' ? { areaSize: { [Op.gte]: parseFloat(minArea) } } : null,
      
    //   (minArea && maxArea) &&minArea!=='Any'&&maxArea!=='Any'? { areaSize: { [Op.between]: [parseFloat(minArea), parseFloat(maxArea)] } } : null,
      
      
            serviceType && serviceType !== 'Any' ? { marketStatus: serviceType } : null,
                    ].filter(Boolean)
                },
                offset: (offset - 1) * limit,
                limit: limit,
                order: [['createdAt', 'DESC']]
            }
        );
       const totalCountQuery = House.count({
  where: {
    [Op.and]: [
      houseType && houseType !== 'Any' ? { houseType: houseType } : null,
      bedrooms && bedrooms !== 'Any' ? { bedrooms: bedrooms } : null,
      bathrooms && bathrooms !== 'Any' ? { bathrooms: bathrooms } : null,
      subcity && subcity !== 'Any' ? { subcity: subcity } : null,
      furnishingType && furnishingType !== 'Any' ? { furnishingStatus: furnishingType } : null,
      
    (minPrice && maxPrice) && (minPrice !== 'Any' && maxPrice !== 'Any') ? { price: { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] } } :
      minPrice === 'Any' && maxPrice !== 'Any' ? { price: { [Op.lte]: parseFloat(maxPrice) } } :
      minPrice !== 'Any' && maxPrice === 'Any' ? { price: { [Op.gte]: parseFloat(minPrice) } } : null,
      
       (minArea && maxArea) && (minArea !== 'Any' && maxArea !== 'Any') ? { areaSize: { [Op.between]: [parseFloat(minArea), parseFloat(maxArea)] } } :
      minArea === 'Any' && maxArea !== 'Any' ? { areaSize: { [Op.lte]: parseFloat(maxArea) } } :
      minArea !== 'Any' && maxArea === 'Any' ? { areaSize: { [Op.gte]: parseFloat(minArea) } } : null,
      
      serviceType && serviceType !== 'Any' ? { marketStatus: serviceType } : null,
    ].filter(Boolean)
  }
});
        
        const totalCount = await totalCountQuery;

        res.status(200).json({ houses: filteredHouses ,total:totalCount});
    } catch (e) {
        next(e);
    }
}

exports.requestProperty = async (req, res, next) => {
    let { houseType, bedrooms, bathrooms, furnishingType, minArea, maxArea, serviceType, subcity } = req.query;
    const user = res.locals.user;

    try {
        await RequestedHouse.create({
            furnishingStatus: furnishingType,
            houseType: houseType,
            minAreaSize: minArea,
            maxAreaSize: maxArea,
            city: 'Addis Ababa',
            subcity: subcity,
            addressName: null,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            floorNumber: null,
            marketStatus: serviceType,
            requestingUserName: user.userName,
            requestingPhoneNumber: user.phoneNumber
        });

        res.status(200).json({ message: "Request sent"});
    } catch (e) {
        next(e);
    }
}

exports.getUnauthHouses = async (req, res, next) => {
    var { offset } = req.query;

    if (!offset || offset < 1) {
        offset = 1;
    }

    try {
        const houses = await House.findAll(
            {
                where: { isActive: true },
                offset: (offset - 1) * limit,
                limit: limit
            }
        );

        res.status(200).json({ houses: houses });
    } catch (e) {
        next(e);
    }
}