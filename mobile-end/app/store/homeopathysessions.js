import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getHomeoPathySessions } from "../api/sessions";
import moment from "moment";

export const fetchSessions = createAsyncThunk(
  "sessions/fetchSessions",
  async () => {
    try {
      // const { ok, data } = await getHomeoPathySessions();
      // if (ok) {
      //   const filter = data.map((session) => ({
      //     id: session._id,
      //     patientId: session?.patientNo?._id ? session.patientNo._id : "",
      //     patientsName: `${session?.patientNo?.contactName?.first} ${session?.patientNo?.contactName?.last}`,
      //     date: session.createdAt ? moment(session?.createdOn).format("L") : "",
      //     complaint: session.chiefComplaint,
      //     sessionType: session.sourceSession,
      //     practitionerId: session?.doctorNo?._id ? session.doctorNo?._id : "",
      //     practitioner: `${session?.doctorNo?.user?.contactName?.first} ${session?.doctorNo?.user?.contactName?.last}`,
      //     clinicId: session?.clinicNo?._id ? session.clinicNo?._id : "",
      //     clinic: `${session?.clinicNo?.user?.contactName?.first} ${session?.clinicNo?.user?.contactName?.last}`,
      //     medicalHistory: {
      //       chiefComplaint: session.chiefComplaint
      //         ? session.chiefComplaint
      //         : "",
      //       symptoms: session.symptoms ? session.symptoms : "",
      //       westernDisease: session.WesternDisease
      //         ? session.WesternDisease
      //         : "",
      //       currentTreatment: session.currentTreatment
      //         ? session.currentTreatment
      //         : [],
      //       diseases: session.diseasesIllnesses
      //         ? session.diseasesIllnesses
      //         : "",
      //       surgeries: session.surgeries ? session.surgeries : "",
      //       medicamentsSupplements: session.medicamentsSupplements
      //         ? session.medicamentsSupplements
      //         : "",
      //       allergies: session.allergies ? session.allergies : "",
      //       pregnancies: session.pregnancies ? session.pregnancies : "",
      //       noteMedicalHistory: session.medicalHistoryNote
      //         ? session.medicalHistoryNote
      //         : "",
      //       familyMembers: session.familyHistory
      //         ? session.familyHistory.map((member) => ({
      //           _id: member._id,
      //           familyMember: member.familyMember ? member.familyMember : "",
      //           disease: member.disease ? member.disease : "",
      //           state: member.state ? member.state : "",
      //           year: member.year ? `${member.year}` : "",
      //         }))
      //         : [],
      //     },
      //     interview: {
      //       socialRelationship: session.socialRelationship
      //         ? session.socialRelationship
      //         : "",
      //       habits: session.habits ? session.habits : [],
      //       sport: session.sport
      //         ? session.sport.name[0]
      //           ? session.sport.name[0]
      //           : ""
      //         : "",
      //       sportFrequency: session.sport
      //         ? session.sport.frequency
      //           ? session.sport.frequency
      //           : []
      //         : [],
      //       hobby: session.hobbies ? session.hobbies[0] : "",
      //       profession: !session.occupation
      //         ? ""
      //         : session?.occupation?.name
      //           ? session?.occupation?.name
      //           : "",
      //       employmentStatus: !session.occupation
      //         ? []
      //         : session?.occupation?.state
      //           ? session.occupation.state
      //           : [],

      //       height: session.height ? session.height : "",
      //       heightUnit: session.heightUnit ? session.heightUnit : "cm",
      //       weight: session.weight ? session.weight : "",
      //       weightUnit: session.weightUnit ? session.weightUnit : "kg",
      //       temperature: session.temperature ? session.temperature : "",
      //       temperatureUnit: session.temperatureUnit
      //         ? session.temperatureUnit
      //         : "Celcius (°C)",
      //       BMI: session.physicalConditionNo
      //         ? session.physicalConditionNo.BMI && session.physicalConditionNo.BMI !== 0
      //           ? session.physicalConditionNo.BMI.toString()
      //           : ""
      //         : "",
      //       BMICategory: session.physicalConditionNo
      //         ? session.physicalConditionNo.BMICategory
      //           ? session.physicalConditionNo.BMICategory
      //           : ""
      //         : "",
      //       thermalFeeling: session.thermalFeeling
      //         ? session.thermalFeeling
      //         : [],
      //       perspiration: session.perspiration ? session.perspiration : [],
      //       appetite: session.appetite ? session.appetite : [],
      //       appetiteNote: session.appetiteNote ? session.appetiteNote : "",
      //       vomiting: session.vomiting ? session.vomiting : [],
      //       vomitingNote: session.vomitingNote ? session.vomitingNote : "",
      //       diet: session.diet ? session.diet : [],
      //       dietNote: session.dietNote ? session.dietNote : "",
      //       taste: session.taste ? session.taste : [],
      //       thirst: session.thirst ? session.thirst : [],
      //       defecation: session.defecation ? session.defecation : [],
      //       urination: session.urination ? session.urination : [],
      //       urinationColor: session.urineColor ? session.urineColor : [],
      //       sleep: session.sleeping ? session.sleeping : [],
      //       head: session.head ? session.head : [],
      //       eyes: session.eyes ? session.eyes : [],
      //       ear: session.ear ? session.ear : [],
      //       nose: session.nose ? session.nose : [],
      //       throat: session.throat ? session.throat : [],
      //       menstruationHistory: session.menstruationHistory
      //         ? session.menstruationHistory
      //         : [],
      //       leukorrhea: session.leukorrhea ? session.leukorrhea : [],
      //       painLocation: session.painLocation ? session.painLocation : "",
      //       painNature: session.painNature ? session.painNature : "",
      //       emotionalStatus: session.emotionalStatus
      //         ? session.emotionalStatus
      //         : "",
      //       emotionalNote: session.emotionalNote
      //         ? session.emotionalNote
      //         : "",
      //       mind: session.mind ? session.mind : "",
      //       interviewNote: session.interviewNote ? session.interviewNote : "",
      //     },
      //     inspectionAndExamination: {
      //       respiration: session.respiration ? session.respiration : [],
      //       speech: session.speech ? session.speech : [],
      //       cough: session.cough ? session.cough : [],
      //       odor: session.odor ? session.odor : [],
      //       vitality: session.vitality ? session.vitality : [],
      //       appearance: session.appearance ? session.appearance : "",
      //       colorFace: session.faceColorLustre ? session.faceColorLustre : "",
      //       physicalAppearance: session.physical
      //         ? session.physical.appearance
      //           ? session.physical.appearance
      //           : []
      //         : [],
      //       appearanceNote: session.appearanceNote
      //         ? session.appearanceNote
      //         : "",
      //       epigastriumPalpation: session.physical
      //         ? session.physical.palpationEpigastrium
      //           ? session.physical.palpationEpigastrium
      //           : []
      //         : [],
      //       epigastriumPalpationNote: session.physical
      //         ? session.physical.palpationEpigastriumNote
      //           ? session.physical.palpationEpigastriumNote
      //           : ""
      //         : "",
      //       abdomenPalpation: session.physical
      //         ? session.physical.palpationAbdomen
      //           ? session.physical.palpationAbdomen
      //           : []
      //         : [],
      //       rangeMotion: session.rangeMotion ? session.rangeMotion : "",
      //       painLevel: session.painLevel ? session.painLevel : "",
      //       physicalExaminationNote: session.physicalExaminationNote
      //         ? session.physicalExaminationNote
      //         : "",
      //     },
      //     homeoTreatment: {
      //       homeoDiagnosis: session.homeoDiagnosis
      //         ? session.homeoDiagnosis
      //         : "",
      //       principleTreatment: session.principleTreatment
      //         ? session.principleTreatment[0]
      //         : "",
      //       treatmentNote: session.treatmentNote
      //         ? session.treatmentNote
      //         : "",
      //       remedy: session.remedy ? session.remedy : [],
      //       dietTherapy: session.dietTherapy ? session.dietTherapy : "",
      //       recommendation: session.recommendation
      //         ? session.recommendation
      //         : "",
      //     },
      //   }));
      //   // delete data[data.length - 1].patientNo;
      //   // delete data[data.length - 1].doctorNo;
      //   // delete data[data.length - 1].clinicNo;
      //   // console.log("data.length");
      //   // console.log(data[data.length - 1]);
      //   return filter;
      // }
    } catch (error) {
      console.log("Error in sessions");
      console.log(error);
    }
  }
);

const sessionSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSessions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSessions.fulfilled, (state, action) => {
      state.sessions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSessions.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearSelected, setToSelected } = sessionSlice.actions;
export default sessionSlice.reducer;
