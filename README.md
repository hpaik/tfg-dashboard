<img src="https://github.com/gulycat1214/tfg-dashboard/blob/master/appDiagrams/upc-tech.png" height="70" width="350">
<img src="https://github.com/gulycat1214/tfg-dashboard/blob/master/appDiagrams/unsw.png" height="100" width="220">


**Bachelor's Final Thesis Project - Guillermo Cobo Arroniz**

*VISUAL ANALYSIS OF BLOCKCHAIN APPLICATIONS* 

**Application CFG:**
The application control flow graph<br/>
![alt text](https://github.com/gulycat1214/tfg-dashboard/blob/master/appDiagrams/appCFG.png?raw=true)

**Dashboard structure:**
The application structure
![alt text](https://github.com/gulycat1214/tfg-dashboard/blob/master/appDiagrams/architectureDiagram.png?raw=true)

**For execution:**

1) run npm install on /client and /server

on /client:
  -> npm run watch

on /server:
  -> node server.js

*Client in localhost:3000*

*Server in localhost:8080*

**Testing a use case - CryptoKitties**

1) Generate UML of smart contracts: *0x06012c8cf97bead5deae237070f9587f8e7a266d*
2) Highlight specific contracts: Type contract name in form *Diagram Interactivity*
3) For dynamic analysis in *Network analysis*: Type *cryptokittiesTransactions.csv* and *cryptokittiesAbi.json*
![alt text](https://github.com/gulycat1214/tfg-dashboard/blob/master/appDiagrams/static-dynamic-visual-data-CryptoKitties-zoom.png?raw=true)
![alt text](https://github.com/gulycat1214/tfg-dashboard/blob/master/appDiagrams/static-dynamic-visual-data-CryptoKitties.png?raw=true)

**For input data plotting:**

1) Transaction data has to be stored in the folder /client/public/input_data in a .CSV
2) ABI contract file has to be stored in the folder /client/public/input_abi in a .JSON
