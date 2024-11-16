import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
// import { getTCMSessions } from "../api/tcmsessions";

export const fetchSessions = createAsyncThunk(
    "sessions/fetchSessions",
    async () => {
        try {
            const { ok, data } = await getTCMSessions();
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
                        medicaments: session.medicamentsSupplements
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
                        menstruation: session.menstruationHistory
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
                        colorFace: session.faceColorLustre ? session.faceColorLustre : "",
                        physicalAppearance: session.physical
                            ? session.physical.appearance
                                ? session.physical.appearance
                                : []
                            : [],
                        appearanceNote: session.appearanceNote ? session.appearanceNote : "",
                        tongueShape: session.tongue
                            ? session.tongue.shape
                                ? session.tongue.shape
                                : []
                            : [],
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
                        tongueQuality: session.tongue
                            ? session.tongue.quality
                                ? session.tongue.quality
                                : []
                            : [],
                        pulseRhythm: session.pulse
                            ? session.pulse.rhythm
                                ? session.pulse.rhythm
                                : []
                            : [],
                        pulseTension: session.pulse
                            ? session.pulse.tension
                                ? session.pulse.tension
                                : []
                            : [],
                        pulseStrength: session.pulse
                            ? session.pulse.strength
                                ? session.pulse.strength
                                : []
                            : [],
                        pulseSpeed: session.pulse
                            ? session.pulse.speed
                                ? session.pulse.speed
                                : []
                            : [],
                        pulseDepth: session.pulse
                            ? session.pulse.depth
                                ? session.pulse.depth
                                : []
                            : [],
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
                        physicalExaminationNote: session.physical
                            ? session.physical.examinationNote
                                ? session.physical.examinationNote
                                : ""
                            : "",
                    },
                    tcmTreatment: {
                        tcmDiagnosis: session.tcmDiagnosis ? session.tcmDiagnosis : "",
                        principleTreatment: session.principleTreatment ? session.principleTreatment[0] : "",
                        acuCombination: session.acuCombination ? session.acuCombination.map((aC) => {
                            return { ...aC, stimulationDuration: parseInt(aC.stimulationDuration) };
                        }) : [{ acuPoints: '', stimulationDuration: 0, stimulationMethod: '', needleManipulation: '', }],
                        acuTreatmentNote: session.acuTreatmentNote ? session.acuTreatmentNote : "",
                        herbalFormula1: session.herbalFormula1 ? session.herbalFormula1 : "",
                        materiaMedica1: session.materiaMedica1 ? session.materiaMedica1.map((mM1) => {
                            return { ...mM1, dosage: mM1.dosage && mM1.dosage !== 0 ? mM1.dosage.toString() : "" };
                        }) : [{ materiamedica: '', dosage: "", unit: "" }],
                        herbalFormula2: session.herbalFormula2 ? session.herbalFormula2 : "",
                        materiaMedica2: session.materiaMedica2 ? session.materiaMedica2.map((mM2) => {
                            return { ...mM2, dosage: mM2.dosage && mM2.dosage !== 0 ? mM2.dosage.toString() : "" };
                        }) : [{ materiamedica: '', dosage: "", unit: "" }],
                        TDP: session.TDP ? session.TDP : "",
                        TDPNote: session.TDPNote ? session.TDPNote : "",
                        tuina: session.tuina ? session.tuina : "",
                        auricularAcupuncture: session.auricularAcupuncture ? session.auricularAcupuncture : "",
                        dietTherapy: session.dietTherapy ? session.dietTherapy : "",
                        recommendation: session.recommendation ? session.recommendation : "",
                    },
                }));
                // delete data[data.length - 1].patientNo;
                // delete data[data.length - 1].doctorNo;
                // delete data[data.length - 1].clinicNo;
                // console.log("data.length");
                // console.log(data[data.length - 1]);
                return filter;
            } else {
                console.log("NO TCM SESSIONS DATA")
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
