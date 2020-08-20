<template>
  <div class="container mt-5" >
    <b-form @submit.prevent="handleFormSubmit">
      <b-row>
        <b-col md="6">
          <b-form-group label="Street">
            <b-form-input v-model="formData.street"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <b-form-group label="City">
            <b-form-input v-model="formData.city"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="State">
            <b-form-input v-model="formData.state"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Zip">
            <b-form-input v-model="formData.zip"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <GmapMap id="map" ref=""
      :center="{lat:-29, lng:-51}"
      :zoom="5"
      map-type-id="roadmap"
      style="width: 100%; height: 500px; margin-top:60px;"
    >
      <div v-if="savedLocations.length > 0" >
        <GmapMarker ref="map"
          v-for="(l, index) in savedLocations"
          :key="index"
          :position="{lat: parseFloat(l.latitude), lng: parseFloat(l.longitude)}"
          @click="showProducts()"
        />
      </div>
    </GmapMap>
  </div>
</template>

<script>
import axios from "axios";
import { db, fb } from "../firebase";

export default {
  name: "MapGeocoder",
  data: () => ({
    savedLocations: [],
    
    formData: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  }),
  
  async beforeMount() {
    const snap = await db.collection("markers").get();

    snap.docs.forEach((doc) => {
      this.savedLocations.push(doc.data());
    });
  },
  methods: {
    async handleFormSubmit() {
      //validate form
      if (
        !this.formData.street ||
        !this.formData.city ||
        !this.formData.state ||
        !this.formData.zip
      ) {
        alert("You must add a full address!");
        return;
      }

      //Make request
      let address = `${this.formData.street}, ${this.formData.city}, ${this.formData.state} ${this.formData.zip}`;
      let { data } = await axios.post(
        "https://us-central1-geocoding-project-3f025.cloudfunctions.net/geocodeAddressAndSave",
        {
          address: address,
        }
      );

      if (data === "No Results") {
        alert("No results for address");
        return;
      }

      //massage data to fit our schema
      let obj = {
        address: data.address,
        geoPoint: {
          latitude: data.geoPoint._latitude,
          longitude: data.geoPoint._longitude,
        },
      };

      //add to saved locations to update map
      this.savedLocations.push(obj);

      //clear form
      this.formData.street = "";
      this.formData.city = "";
      this.formData.state = "";
      this.formData.zip = "";
    },
   
  },
};
</script>
