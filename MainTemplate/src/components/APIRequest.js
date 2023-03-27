// 7. Post  -  http://IPAdress/api/map/post/maplist
export function API_maplist_Req(instructorId) {
    return {
        instructorId: instructorId
    }
}

// 16. Post- http://IPAdress/api/content/post/contentlist
export function API_contentlist_Req(instructorId) {
    return {
        instructorId: instructorId
    }
}

// 42. get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1
export function API_quizlist_Req(instructorId) {
    return {
        instructorId: instructorId
    }
}

// 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
export function API_lecturelist_Req(startDate, endDate, instructorId) {
    return {
        instructorId: String(instructorId),
        startDate: startDate,
        endDate: endDate
    }
}

// 11. Patch - http://IPAdress/api/lecture/instructor/patch/deletelecture
export function API_insdeletelecturelist_Req(id) {
    return {
        id: id
    }
}

// 23. Post - http://localhost:8088/api/lecture/student/delete/deletelecture
export function API_deletelecturelist_Req(studentId, lectureId) {
    return {
        studentId: studentId,
        lectureId: lectureId
    }
}

// 10. Patch - http://163.180.117.47:8088/api/lecture/instructor/patch/updatelecture
export function API_updatelecture_Req(lectureinfo, instructorId) {
    var startTime = lectureinfo.showevent[0].CalendarClassnameAction;
    var endTime = lectureinfo.showevent[1].CalendarClassnameAction;
    return {
        id: String(lectureinfo.classid),
        name: lectureinfo.name,
        instructorId: String(instructorId),
        mapId: String(lectureinfo.mapId),
        contentId: String(lectureinfo.contentId),
        quizId: String(lectureinfo.quizId),
        startTime: startTime,
        endTime: endTime
    }
}

// 8. Patch - http://IPAdress/api/map/patch/updatemap
export function API_updatemap_Req(mapinfo) {
    return {
        id: mapinfo.id,
        name: mapinfo.name,
        type: mapinfo.type,
        maxUser: mapinfo.maxUser
    }
}

// 45. Post - http://localhost:8088/api/mail/sendAll
export function API_mailsend_Req(context, instructorId) {
    return {
        instructorId: String(instructorId),
        context: context.data
    }
}

// 46. Post - http://localhost:8088/api/sms/send
export function API_smssend_Req(context, instructorId) {
    return {
        instructorId: String(instructorId),
        context: context.data
    }
}

// 9. Post - http://IPAdress/api/lecture/instructor/post/createlecture
export function API_createlecture_Req(createinfo, instructorId) {
    return {
        name: createinfo.name,
        instructorId: instructorId,
        isAutoClass: createinfo.isAutoClass,
        mapId: createinfo.mapId,
        quizId: createinfo.quizId,
        contentId: createinfo.contentId,
        stulist: createinfo.stulist,
        startTime: createinfo.startTime,
        endTime: createinfo.endTime
    }
}

/*var payload = {
    quizId: this.CreateClassModalQuiz,
    name: this.CreateClassModalTitle,
    instructorId: userId,
    mapId: this.selectedMap,
    contentId: this.CreateClassModalFile,
    stulist: studentlist,
    startTime: this.CreateClassModalStartDate1+":00",
    endTime: this.CreateClassModalFinishDate3+":00"
}*/

// 32. post - http://localhost:8088/api/users/post/studentlistbydepartment
export function API_studentlistbydepartment_Req(departmentId) {
    return {
        departmentId: String(departmentId)
    }
}

// 27. Get- http://localhost:8088/api/department/get/departmentlist

// 5. Post - http://IPAdress/api/map/post/createmap
export function API_createmap_Req(name, maptype, maxUser, instructorId) {
    return {
        name: name,
        type: maptype,
        maxUser: maxUser,
        instructorId: instructorId
    }
}

// 26. Post - http://IPAddress/api/department/post/postdepartment
export function API_postdepartment_Req(departmentName) {
    return {
        name: departmentName
    }
}

// 28. post http://localhost:8088/api/department/patch/deletedepartment 
export function API_deletedepartment_Req(departmentId) {
    return {
        id: departmentId
    }
}

// 48. Post http://localhost:8088/api/users/post/checkLoginId
export function API_checkloginid_Req(loginId) {
    return {
        loginId: loginId
    }
}

// 4. Post - http://IPAdress/api/users/post/register
export function API_register_Req(loginId, password, name, userMode, email, departmentId, phone) {
    return {
        loginId: loginId,
        // base64 encoding
        // password: window.btoa(this.userpass),
        password: password,
        name: name,
        userMode: userMode,
        email: email,
        departmentId: departmentId,
        phone: phone
    }
}

// 3. Patch - http://IPAdress/api/users/patch/deleteuser
export function API_deleteuser_Req(userId, loginId, userMode) {
    return {
        id: userId,
        loginId: loginId,
        userMode: userMode
    }
}

// 40. post http://163.180.117.47:8088/api/quiz/post/createquiz
export function API_createquiz_Req(quizFrontMapName, data, userId) {
    return {
        name: quizFrontMapName,
        data: data,
        instructorId: userId
    }
}

// 43.post http://IPAddress/api/quiz/post/updatequiz
export function API_updatequiz_Req(quizId, quizName, data) {
    return {
        id: quizId,
        name: quizName,
        data: data
    }
}



// 35. Get http://IPAddress/api/ip/get/list

// 33. Post http://IPAddress/api/ip/post/create
export function API_createip_Req(ipAddress, ipName, maxUser) {
    return {
        address: ipAddress,
        name: ipName,
        maxUser: maxUser
    }
}

// 34. Get http://IPAddress/api/ip/get/delete?id={ipId}
export function API_deleteip_Req(ipId) {
    return{
        ipId: ipId
    }
}

// 18. Post http://IPAddress/api/server/post/createserver
export function API_createserver_Req(lectureId, ipId) {
    return {
        lectureId: lectureId,
        ipId: ipId
    }
}


// 31. Get http://IPAddress/api/users/get/allInstructor


// 20. Get - http://IPAddress/api/server/get/findlectureinfo?instructorId={instructorId}
export function API_findlecture_Req(instructorId) {
    return {
        instructorId: instructorId
    }
}


// 19. Post - http://IPAddress/api/server/post/listserver
export function API_serverlist_Req(instructorId) {
    return {
        instructorId: instructorId
    }
}


// 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
export function API_lecturelist_Req_(startDate, endDate, instructorId) {
    return {
        instructorId: instructorId,
        startDate: startDate,
        endDate: endDate
    }
}


// 17. Post - http://IPAddress/api/lecture/instructor/post/cktstubylecture
export function API_cktstudbylecture_Req(lectureId) {
    return {
        lectureId: lectureId
    }
}

// 22. Post - http://IPAddress/api/lecture/student/post/lecturelist
export function API_studentlecturelist_Req(studentId, startDate, endDate) {
    return {
        studentId: studentId,
        startDate: startDate,
        endDate: endDate
    }
}

// 25. Post - http://IPAddress/api/lecture/student/post/registerlecturelist
export function API_registerlecturelist_Req(studentId, startDate, endDate) {
    return {
        studentId: studentId,
        startDate: startDate,
        endDate: endDate
    }
}


// 24. Post - http://IPAddress/api/lecture/student/post/joinlecture
export function API_joinlecture_Req(studentId, lectureId) {
    return {
        studentId: studentId,
        lectureId: lectureId
    }
}



// 6. Patch - http://IPAdress/api/map/patch/deletemap
export function API_deletemap_Req(mapId) {
    return {
        id: mapId
    }
}

// 14. Post - http://IPAddress/api/content/post/updateidbycontentid
export function API_updateidbycontentid_Req(instructorId, contentId, contentName, playtime) {
    return {
        instructorId: instructorId,
        contentId: contentId,
        contentName: contentName,
        playtime: playtime
    }
}

// 15. Patch - http://IPAddress/api/content/patch/deletecontent
export function API_deletecontent_Req(contentId) {
    return {
        id: contentId
    }
}

// 49. Patch - http://IPAddress/api/users/patch/updateuser
export function API_updateuser_Req(userInfo) {
    return {
        id: userInfo.id,
        password: userInfo.password,
        name: userInfo.name,
        userMode: userInfo.userMode,
        email: userInfo.email,
        phone: userInfo.phone,
        departmentId: userInfo.departmentId,
        status: userInfo.status
    }
}

// 53. Post - http://IPAddress/api/certificate/post/getcertificateinfobyid
export function API_getcertificateinfobyid_Req(instructorId, certificateId, certificateName) {
    return {
        instructorId: instructorId,
        certificateId: certificateId,
        certificateName: certificateName
    }
}

// 54. Post - http://IPAddress/api/certificate/post/certificatelist
export function API_certificatelist_Req(instructorId) {
    return {
        instructorId: instructorId
    }
}

// 55. Patch - http://IPAddress/api/certificate/patch/deletecertificate
export function API_deletecertificate_Req(certificateId) {
    return {
        id: certificateId
    }
}

// 56. Patch - http://IPAddres/api/users/patch/updateuserstatus
export function API_updateuserstatus_Req(userId, userMode, status) {
    return {
        id: userId,
        userMode: userMode,
        status: status
    }
}

// 51. Post - http://IPAddress/api/users/post/changePassword
export function API_changepassword_Req(userId, password, userMode) {
    return {
        id: userId,
        password: password,
        userMode: userMode
    }
}