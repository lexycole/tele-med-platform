import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getAyurvedaSessions } from "../api/ayurveda";
import moment from "moment";

export const fetchSessions = createAsyncThunk(
  "sessions/fetchSessions",
  async () => {
    try {
      const { ok, data } = await getAyurvedaSessions();
      if (ok) {
        const filter = data.map((session) => ({
          id: session._id,
          patientId: session?.patientNo?._id ? session.patientNo._id : "",
          patientsName: `${session?.patientNo?.user?.contactName?.first} ${session?.patientNo?.user?.contactName?.last}`,
          date: session.createdAt ? moment(session?.createdAt).format("L") : "",
          complaint: session.chiefComplaint,
          sessionType: session.sourceSession,
          practitionerId: session?.doctorNo?._id ? session.doctorNo?._id : "",
          practitioner: `${session?.doctorNo?.user?.contactName?.first} ${session?.doctorNo?.user?.contactName?.last}`,
          clinicId: session?.clinicNo?._id ? session.clinicNo?._id : "",
          clinic: `${session?.clinicNo?.user?.contactName?.first} ${session?.clinicNo?.user?.contactName?.last}`,
          medicalHistory: {
            chiefComplaint: session.chiefComplaint
              ? session.chiefComplaint
              : "",
            symptoms: session.symptoms ? session.symptoms : "",
            westernDisease: session.WesternDisease
              ? session.WesternDisease
              : "",
            currentTreatment: session.currentTreatment
              ? session.currentTreatment
              : [],
            diseases: session.diseasesIllnesses
              ? session.diseasesIllnesses
              : "",
            surgeries: session.surgeries ? session.surgeries : "",
            medicamentsSupplements: session.medicamentsSupplements
              ? session.medicamentsSupplements
              : "",
            allergies: session.allergies ? session.allergies : "",
            pregnancies: session.pregnancies ? session.pregnancies : "",
            noteMedicalHistory: session.medicalHistoryNote
              ? session.medicalHistoryNote
              : "",
            familyMembers: session.familyHistory
              ? session.familyHistory.map((member) => ({
                _id: member._id,
                familyMember: member.familyMember ? member.familyMember : "",
                disease: member.disease ? member.disease : "",
                state: member.state ? member.state : "",
                year: member.year ? `${member.year}` : "",
              }))
              : [],
            medicalHistoryNote: session.noteMedicalHistory
              ? session.noteMedicalHistory
              : "",
          },
          interview: {
            socialRelationship: session.socialRelationship
              ? session.socialRelationship
              : "",
            habits: session.habits ? session.habits : [],
            profession: session.occupation
              ? session.occupation.name
                ? session.occupation.name
                : ""
              : "",
            employmentStatus: session.occupation
              ? session.occupation.state
                ? session.occupation.state
                : []
              : [],
            sport: session.sport
              ? session.sport.name
                ? session.sport.name
                : ""
              : "",
            sportFrequency: session.sport
              ? session.sport.frequency
                ? session.sport.frequency
                : []
              : [],
            hobby: session.hobbies ? session.hobbies : "",
            height: session.physicalConditionNo
              ? session.physicalConditionNo.height && session.physicalConditionNo.height !== 0
                ? session.physicalConditionNo.height.toString()
                : ""
              : "",
            heightUnit: session.physicalConditionNo
              ? session.physicalConditionNo.heightUnit
                ? session.physicalConditionNo.heightUnit
                : "cm"
              : "cm",
            weight: session.physicalConditionNo
              ? session.physicalConditionNo.weight && session.physicalConditionNo.weight !== 0
                ? session.physicalConditionNo.weight.toString()
                : ""
              : "",
            weightUnit: session.physicalConditionNo
              ? session.physicalConditionNo.weightUnit
                ? session.physicalConditionNo.weightUnit
                : "kg"
              : "kg",
            temperature: session.physicalConditionNo
              ? session.physicalConditionNo.temperature && session.physicalConditionNo.temperature !== 0
                ? session.physicalConditionNo.temperature.toString()
                : ""
              : "",
            temperatureUnit: session.physicalConditionNo
              ? session.physicalConditionNo.temperatureUnit
                ? session.physicalConditionNo.temperatureUnit
                : "Celcius"
              : "Celcius",
            BMI: session.physicalConditionNo
              ? session.physicalConditionNo.BMI && session.physicalConditionNo.BMI !== 0
                ? session.physicalConditionNo.BMI.toString()
                : ""
              : "",
            BMICategory: session.physicalConditionNo
              ? session.physicalConditionNo.BMICategory
                ? session.physicalConditionNo.BMICategory
                : ""
              : "",
            thermalFeeling: session.thermalFeeling
              ? session.thermalFeeling
              : [],
            perspiration: session.perspiration ? session.perspiration : [],
            appetite: session.appetite ? session.appetite : [],
            appetiteNote: session.appetiteNote ? session.appetiteNote : "",
            vomiting: session.vomiting ? session.vomiting : [],
            vomitingNote: session.vomitingNote ? session.vomitingNote : "",
            diet: session.diet ? session.diet : [],
            dietNote: session.dietNote ? session.dietNote : "",
            taste: session.taste ? session.taste : [],
            thirst: session.thirst ? session.thirst : [],
            defecation: session.defecation ? session.defecation : [],
            urination: session.urination ? session.urination : [],
            urinationColor: session.urineColor ? session.urineColor : [],
            sleep: session.sleeping ? session.sleeping : [],
            head: session.head ? session.head : [],
            eyes: session.eyes ? session.eyes : [],
            ear: session.ear ? session.ear : [],
            nose: session.nose ? session.nose : [],
            throat: session.throat ? session.throat : [],
            menstruationHistory: session.menstruationHistory
              ? session.menstruationHistory
              : [],
            leukorrhea: session.leukorrhea ? session.leukorrhea : [],
            painLocation: session.painLocation ? session.painLocation : "",
            painNature: session.painNature ? session.painNature : "",
            emotionalStatus: session.emotionalStatus ? session.emotionalStatus : [],
            emotionalNote: session.emotionalNote ? session.emotionalNote : "",
            mind: session.mind ? session.mind : "",
            interviewNote: session.interviewNote ? session.interviewNote : "",
          },
          inspectionAndExamination: {
            respiration: session.respiration ? session.respiration : [],
            speech: session.speech ? session.speech : [],
            cough: session.cough ? session.cough : [],
            odor: session.odor ? session.odor : [],
            vitality: session.vitality ? session.vitality : [],
            appearance: session.appearance ? session.appearance : "",
            colorFace: session.faceColorLustre ? session.faceColorLustre : [],
            physicalAppearance: session.physical
              ? session.physical.appearance
                ? session.physical.appearance
                : []
              : [],
            appearanceNote: session.appearanceNote
              ? session.appearanceNote
              : "",
            epigastriumPalpation: session.physical
              ? session.physical.palpationEpigastrium
                ? session.physical.palpationEpigastrium
                : []
              : [],
            epigastriumPalpationNote: session.physical
              ? session.physical.palpationEpigastriumNote
                ? session.physical.palpationEpigastriumNote
                : ""
              : "",
            abdomenPalpation: session.physical
              ? session.physical.palpationAbdomen
                ? session.palpationAbdomen
                : []
              : [],
            rangeMotion: session.rangeMotion ? session.rangeMotion : "",
            painLevel: session.painLevel ? session.painLevel : "",
            tongueShape: session.tongue
              ? session.tongue.shape
                ? session.tongue.shape[0]
                : ""
              : "",
            tongueColor: session.tongue
              ? session.tongue.color
                ? session.tongue.color
                : []
              : [],
            tongueNote: session.tongue
              ? session.tongue.note
                ? session.tongue.note
                : ""
              : "",
            pulseRate: session.pulse
              ? session.pulse.rate
                ? session.pulse.rate[0]
                : ""
              : "",
            pulseType: session.pulse
              ? session.pulse.Type
                ? session.pulse.Type[0]
                : ""
              : "",
            mindConstitution: session.mindConstitution
              ? session.mindConstitution[0]
              : "",
            aBodyConstitution: session.aBodyConstitution
              ? session.aBodyConstitution[0]
              : "",
            diseaseFormation: session.diseaseFormation
              ? session.diseaseFormation[0]
              : "",
            physicalExaminationNote: session.physicalExaminationNote
              ? session.physicalExaminationNote
              : "",
          },
          ayurvedaTreatment: {
            ayurvedaDiagnosis: session.ayurvedaDiagnosis
              ? session.ayurvedaDiagnosis
              : "",
            principleTreatment: session.principleTreatment
              ? session.principleTreatment
              : [],
            treatmentNote: session.treatmentNote ? session.treatmentNote : "",
            remedy: session.remedy
              ? session.remedy.map((r) => {
                return { ...r, dosage: r.dosage && r.dosage !== 0 ? r.dosage.toString() : "" };
              })
              : [],
            dietTherapy: session.dietTherapy ? session.dietTherapy : "",
            recommendation: session.recommendation
              ? session.recommendation
              : "",
          },
        }));
        // delete data[data.length - 1].patientNo;
        // delete data[data.length - 1].doctorNo;
        // delete data[data.length - 1].clinicNo;
        // console.log("data.length");
        // console.log(data[data.length - 1]);
        return filter;
      } else {
        return [];
      }
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
