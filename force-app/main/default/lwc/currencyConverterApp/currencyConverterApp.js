import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList'
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'
export default class CurrencyConverterApp extends LightningElement {
    currencyImage = currencyConverterAssets +'/currencyConverterAssets/currency.svg'
    countryList = countryCodeList
    countryFrom = "USD"
    countryTo = "INR"
    amount=''
    //amt
    result
    error
    handleChange(event){
    const {name, value} = event.target
    console.log("name", name)
    console.log("value", value)
    this[name] = value
    this.result=''
    this.error=''
  }
  submitHandler(event){
    event.preventDefault()
    this.convert()
  }
  async convert(){
    const API_URL = `https://api.frankfurter.app/latest?amount=${this.amount}&from=${this.countryFrom}&to=${this.countryTo}`
    try{
      const data = await fetch(API_URL)
      const jsonData = await data.json()
      this.result = jsonData.rates[this.countryTo]
      console.log(this.result)
    } catch(error){
      console.log(error)
      this.error="An error occurred. Please try again..."
    }
  }
}