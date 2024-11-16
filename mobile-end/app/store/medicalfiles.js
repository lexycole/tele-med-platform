import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getAyurvedaSession, getAyurvedaSessions } from "../api/ayurveda";
// import { getMedicalfiles } from "../api/medicalfiles";
// import { getHomeoPathySession } from "../api/sessions";

export const fetchMedicalfiles = createAsyncThunk(
  "medicalfiles/fetchMedicalfiles",
  // "homoesession/fetchHomeosessions",
  async (itemsPerPage = 10) => {

    // const { ok, res } = await getMedicalfiles();
    // const res1 = await getHomeoPathySession();
    console.log('======000000000000=====')
    const {ok,data} = await getAyurvedaSessions();
    // if (ok) {
      // const homeSessionData = res1.data;
      // console.log(homeSessionData,'========',)
      // const ayurvedaSessionsData = res2;
      // const data =res1.data
      console.log(data,'==+ ++++++ +==')
      // homeSessionData.concat(ayurvedaSessionsData,res);
      // const combined= data.concat (ayurveda,homeo)
      // const wholeArray=combine.concat(homeo)
      const filter = data.map((file) => ({
        // id: file._id,
        patientId: file.patientNo._id,
        avatar: file.patientNo.imageSrc,
        patientName: `${file.patientNo.contactName.first} ${file.patientNo.contactName.last}`,
        complaint: file.chiefComplaint,
        date: file.date,
        session: file.sessionType,
        doctor: file.doctorNo,
        clinic: file.clinicNo,
      }));
      return {
        data: filter,
        numberOfPages: Math.ceil(filter.length / itemsPerPage),
      };
    // }
 
  }
);

const medicalfilesSlice = createSlice({
  name: "medicalfiles",
  initialState: {
    medicalfiles: [],
    loading: false,
    numberOfPages: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMedicalfiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMedicalfiles.fulfilled, (state, action) => {
      state.medicalfiles = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.loading = false;
    });
    builder.addCase(fetchMedicalfiles.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default medicalfilesSlice.reducer;
