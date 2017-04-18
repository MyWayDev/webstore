import { database, initializeApp } from 'firebase';
import { firebaseConfig } from './src/environments/firebase.config';
import { dbData } from './db-data';

console.log('starting initializeApp............')

initializeApp(firebaseConfig);

const groupsRef = database().ref('groups');
const productsRef = database().ref('products');

dbData.groups.forEach(group =>{
                                                console.log('adding group',group)
    const groupRef = groupsRef.push({
            groupName: group.groupName,
            groupImg:group.groupImg

    });

    let productKeysPerGroup = [];

    group.products.forEach((product:any)=>{
                                                console.log('adding product',product)
        productKeysPerGroup.push(productsRef.push({
            productId:product.productId,
            name: product.name,
            desc:product.desc,
            price: product.price,
            bp:product.bp,
            size:product.size,
            isNew:product.isNew,
            isActive:product.isActive,
            stock:product.stock || 0,
            promoId:product.promoId || null,
            groupId:groupRef.key
        }).key);
                                                console.log(productKeysPerGroup);
    });

    const association = database().ref('productsPerGroup');
    const productsPerGroup = association.child(groupRef.key);

    productKeysPerGroup.forEach(productKey =>{

                                                console.log('add product to group',productKey)

        const productGroupAssociation = productsPerGroup.child(productKey);
        productGroupAssociation.set(true);
    })


   
})