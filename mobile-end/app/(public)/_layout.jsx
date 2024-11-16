import React from 'react';
import { Stack } from 'expo-router';

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00B7DD',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Login',
        }}></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Create Account',
        }}></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: 'Reset Password',
        }}></Stack.Screen>

          <Stack.Screen
            name="TimelineAppointments"
            options={{ headerShown: false }}
          ></Stack.Screen>
           <Stack.Screen
            name="Patients"
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsPatient"
            // component={OperationsPatient}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Users"
            // component={Users}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsUser"
            // component={OperationsUser}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Receptions"
            // component={Receptions}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsReception"
            // component={OperationsReception}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Accountants"
            // component={Accountants}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsAccountant"
            // component={OperationsAccountant}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Clinics"
            // component={Clinics}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsClinic"
            // component={OperationsClinic}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Doctors"
            // component={Doctors}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsDoctor"
            // component={OperationsDoctor}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="ClinicUserProfile"
            // component={ClinicUserProfile}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="Slot2"
            // component={Slot2}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Leaves"
            // component={Leaves}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Shifts"
            // component={Shifts}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Skills"
            // component={Skills}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="MedicalFilesScreen"
            // component={MedicalFilesScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
          name="AddOrUpdatePhysicalCondition"
          // component={AddOrUpdatePhysicalCondition}
          options={{headerShown:false}}
          ></Stack.Screen>

             <Stack.Screen
            name="PhysicalConditions"
            // component={PhysicalConditions}
            options={{ headerShown: false }}
          ></Stack.Screen> 

          <Stack.Screen
            name="AyurvedaSession"
            // component={AyurvedaSession}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="KanbanBoard"
            // component={KanbansScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Calendar"
            // component={CalendarScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Agenda"
            // component={AgendaScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Appointments"
            // component={Appointments}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="AppointmentInfo"
            // component={AppointmentInfo}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="PlanAndSchedule"
            // component={PlanAndScheduleScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="AppointmentProfile"
            // component={AppointmentProfile}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="DirectoryList"
            // component={DirectoryList}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="BusinessProfile"
            // component={BusinessProfile}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="PaymentDetail"
            // component={PaymentDetail}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="PaymentsDetails"
            // component={PaymentsDetails}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Schedule"
            // component={Schedule}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="ScrumScreen"
            // component={ScrumScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Tasks"
            // component={Tasks}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsTasks"
            // component={OperationsTasks}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="GridKanbans"
            // component={GridKanbans}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="AdminKanbans"
            // component={AdminKanbans}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="OperationsSkill"
            // component={OperationsSkill}
            options={{ headerShown: false }}
          ></Stack.Screen>


          <Stack.Screen
            name="EROs"
            // component={EROs}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsERO"
            // component={OperationsERO}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Incidents"
            // component={Incidents}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsIncident"
            // component={OperationsIncident}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="BookAppointment"
            // component={BookAppointment}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Notifications"
            // component={Notifications}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="PrivacyPolicy"
            // component={PrivacyPolicy}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="TermsofUSe"
            // component={TermsofUse}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="AboutUs"
            // component={AboutUs}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Financial"
            // component={Financial}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="ProfitLossStatement"
            // component={ProfitLossStatement}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="ChangePassword"
            // component={ChangePassword}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="MyProfile"
            // component={MyProfile}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="HomeoPathySession"
            // component={HomeoPathySession}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="TCMSession"
            // component={TCMSession}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="COAs"
            // component={COAs}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="Invoices"
            // component={Invoices}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="OperationsInvoice"
            // component={OperationsInvoice}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="OperationsExpense"
            // component={OperationsExpense}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="OperationsProduct"
            // component={OperationsProduct}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="OperationsService"
            // component={OperationsService}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="InvoiceProfile"
            // component={InvoiceProfile}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Expenses"
            // component={Expenses}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="Products"
            // component={Products}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Services"
            // component={Services}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="Forum"
            // component={Forum}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="CreatePost"
            // component={CreatePost}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="CreateComment"
            // component={CreateComment}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="EditComment"
            // component={EditComment}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="ReplyComment"
            // component={ReplyComment}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="CreateNote"
            // component={CreateNote}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="CategoryIndex"
            // component={CategoryIndex}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="CreateTopic"
            // component={CreateTopic}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="Speacility"
            // component={Speacility}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Cardiolist"
            // component={Cardiolist}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="ConsultantDetails"
            // component={ConsultantDetails}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="Tickets"
            // component={Tickets}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Drive"
            // component={Drive}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="FolderDetail"
            // component={FolderDetail}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="GridTickets"
            // component={GridTickets}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            initialParams={{ selectedTicket: {} }}
            name="OperationsTicket"
            // component={OperationsTicket}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            initialParams={{ selectedTicket: {} }}
            name="TicketProfile"
            // component={TicketProfile}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Schedulerf"
            // component={Schedulerf}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Contacts"
            // component={Contacts}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="TabShare"
            // component={TabShare}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="Charts"
            // component={Charts}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="MessagesScreen"
            // component={MessagesScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="ChatScreen"
            // component={ChatScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="FishboneChart"
            // component={FishboneChart}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="PieChart"
            // component={PieChart}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="MapRoute"
            // component={MapRoute}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="TimelineAttendance"
            // component={TimelineAttendance}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="ForumSubCategories"
            // component={SubCategories}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="TopicDetails"
            // component={TopicDetails}
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="TimelineTasks"
            // component={TimelineTasks}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="TimelineTickets"
            // component={TimelineTickets}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="TimelineKaizens"
            // component={TimelineKaizens}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="WorkingHours"
            // component={ WorkingHours }
            options={{ headerShown: false }}
              ></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;