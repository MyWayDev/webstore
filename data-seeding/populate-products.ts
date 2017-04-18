import { database, initializeApp } from 'firebase';
import { firebaseConfig } from '../src/environments/firebase.config';
import { dbJsonData } from './db-json-data';

console.log('starting initializeApp ............')

initializeApp(firebaseConfig);

const groupsRef = database().ref('groups');
const productsRef = database().ref('products');
const promosRef= database().ref('promos');
const profilesRef = database().ref('profile');


dbJsonData.profiles.forEach(profile =>{
        console.log('adding',profile)

     const profileRef = profilesRef.push({
                distrId:profile.distrId,
                id:profile.id,
                name:profile.name
     });   
}),

dbJsonData.groups.forEach(group =>{
                                                console.log('adding group',group)
    const groupRef = groupsRef.push({
            groupName: group.groupName,
            groupImg:group.groupImg

    });

}),
dbJsonData.promos.forEach(promo =>{
                                                console.log('adding promo',promo)
    const promoRef = promosRef.push({
            promoName: promo.promoName,
            promoImg:promo.promoImg
    });


   
})

dbJsonData.products.forEach(product=>{
                                                console.log('adding Products', product)
        const productRef= productsRef.push({                              
                productId:product.productId,
                name:product.name,
                desc:product.desc,
                price:product.price,
                bp:product.bp,
                size:product.size,
                isNew:false,
                active:true,
                stock:0,
                productImg:product.productImg,
                promoImg:product.promoImg,
                promoName:product.promoName,
                groupName:product.groupName

                });
})