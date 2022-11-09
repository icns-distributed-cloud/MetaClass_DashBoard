var resourceHost = "http://163.180.117.43:8088";

export const Users = {
    // 로그인 관련 API : 1. Post - http://IPAddress/api/users/post/login
    PostLoginAPI: resourceHost + "/api/users/post/login",
    // 회원 정보 조회 API : 2. Get - http://IPAddress/api/users/get/allstudent
    GetAllStudentAPI: resourceHost + "/api/users/get/allstudent",
    // 회원 정보 삭제 API : 3. Patch - http://IPAddress/api/users/patch/deleteuser
    PatchDeleteUserAPI: resourceHost + "/api/users/patch/deleteuser",
    // 회원 가입 API : 4. Post - http://IPAddress/api/users/post/register
    PostRegisterAPI: resourceHost + "/api/users/post/register",
    // 모든 강사 회원 정보 리스트 API : 31. Get - http://IPAddress/api/users/get/allInstructor
    GetAllInstructorAPI: resourceHost + "/api/users/get/allInstructor",
    // 부서별 학생 리스트 API : 32. Post - http://IPAddress/api/users/post/studentlistbydepartment
    PostStudentListbyDepartmentAPI: resourceHost + "/api/users/post/studentlistbydepartment",
    // 아이디 중복체크 API : 48. Post - http://IPAddress/api/users/post/checkLoginId
    PostCheckLoginIdAPI: resourceHost + "/api/users/post/checkLoginId",
    // 학생 정보 수정 API : 49. Patch - http://IPAddress/api/users/patch/updateuser
    PatchUpdateUserAPI: resourceHost + "/api/users/patch/updateuser",
    // 첫 로그인 시 비밀번호 0000 체크 API : 51. Post - http://IPAddress/api/users/post/changePassword
    PostChangePasswordAPI: resourceHost + "/api/users/post/changePassword",
}

export const Map = {
    // 강의실 맵 생성 API : 5. Post - http://IPAddress/api/map/post/createmap
    PostCreateMapAPI: resourceHost + "/api/map/post/createmap",
    // 강의실 맵 삭제 API : 6. Patch - http://IPAddress/api/map/patch/deletemap
    PatchDeleteMapAPI: resourceHost + "/api/map/patch/deletemap",
    // 강의실 맵 리스트 API : 7. Post - http://IPAddress/api/map/post/maplist
    PostMapListAPI: resourceHost + "/api/map/post/maplist",
    // 강의실 맵 정보 수정 API : 8. Patch - http://IPAddress/api/map/patch/updatemap
    PatchUpdateMapAPI: resourceHost + "/api/map/patch/updatemap",
}

export const Lecture = {
    Instructor: {
        // 강좌 생성 API : 9. Post - http://IPAddress/api/lecture/instructor/post/createlecture
        PostCreateLectureAPI: resourceHost + "/api/lecture/instructor/post/createlecture",
        // 강좌 수정 API : 10. Patch - http://IPAddress/api/lecture/instructor/patch/updatelecture
        PatchUpdateLectureAPI: resourceHost + "/api/lecture/instructor/patch/updatelecture",
        // 강좌 삭제 API : 11. Patch - http://IPAddress/api/lecture/instructor/patch/deletelecture
        PatchDeleteLectureAPI: resourceHost + "/api/lecture/instructor/patch/deletelecture",
        // 선생님 강좌 목록 불러오기 API : 12. Post - http://IPAddress/api/lecture/instructor/post/lecturelist
        PostInsLectureList: resourceHost + "/api/lecture/instructor/post/lecturelist",
        // 특정 강좌 학생 목록 보기 API : 17. Post - http://IPAddress/api/lecture/instructor/post/cktstubylecture
        PostCKTStubyLectureAPI: resourceHost + "/api/lecture/instructor/post/cktstubylecture",
    },
    Student: {
        // 수강 신청한 강좌 조회 API : 22. Post - http://IPAddress/api/lecture/student/post/lecturelist
        PostStuLectureListAPi: resourceHost + "/api/lecture/student/post/lecturelist",
        // 강좌 취소 API : 23. Delete - http://IPAddress/api/lecture/student/delete/deletelecture
        DeleteDeleteLectureAPI: resourceHost + "/api/lecture/student/delete/deletelecture",
        // 강좌 수강 신청 API : 24. Post - http://IPAddress/api/lecture/student/post/joinlecture
        PostJoinLectureAPI: resourceHost + "/api/lecture/student/post/joinlecture",
        // 수강 신청 가능 리스트 API : 25. Post - http://IPAddress/api/lecture/student/post/registerlecturelist
        PostRegistreLectureListAPI: resourceHost + "/api/lecture/student/post/registerlecturelist",
        // 출석 정보 조회 API : 29 Post - http://IPAddress/api/lecture/student/post/ParticipationInfo
        PostParticipationInfoAPI: resourceHost + "/api/lecture/student/post/ParticipationInfo",
    }
}

export const Content = {
    // 컨텐츠 생성 API : 13. Post - http://IPAddress/api/content/post/createcontent
    PostCreateContentAPI: resourceHost + "/api/content/post/createcontent",
    // 강사 ID 저장 API : 14. Post - http://IPAddress/api/content/post/updateidbycontentid
    PostUpdateIdbyContentIdAPI: resourceHost + "/api/content/post/updateidbycontentid",
    // 컨텐츠 삭제 API : 15. Patch - http://IPAddress/api/content/patch/deletecontent
    PatchDeleteContentAPI: resourceHost + "/api/content/patch/deletecontent",
    // 컨텐츠 목록 API : 16. Post - http://IPAddress/api/content/post/contentlist
    PostContentListAPI: resourceHost + "/api/content/post/contentlist",
    // 컨텐츠 ID의 디렉토리 API : 39. Post - http://IPAddress/api/content/post/getcontentinfobyid
    PostGetContentInfobyIdAPI: resourceHost + "/api/content/post/getcontentinfobyid",
}

export const Quiz = {
    // 퀴즈 생성 API : 40. Post - http://IPAddress/api/quiz/post/createquiz
    PostCreateQuizAPI: resourceHost + "/api/quiz/post/createquiz",
    // 퀴즈 삭제 API : 41. Get - http://IPAddress/api/quiz/get/deletequiz?id=
    GetDeleteQuizAPI: resourceHost + "/api/quiz/get/deletequiz?id=",
    // 퀴즈 리스트 API : 42. Get - http://IPAddress/api/quiz/get/list?instructorId=
    GetQuizListAPI: resourceHost + "/api/quiz/get/list?instructorId=",
    // 퀴즈 수정 API : 43. Post - http://IPAddress/api/quiz/post/updatequiz
    PostUpdateQuizAPI: resourceHost + "/api/quiz/post/updatequiz",
    // 점수 채점 API : 44. Post - http://IPAddress/api/quiz/post/scoring
    PostScoringAPI: resourceHost + "/api/quiz/post/scoring",
    // 퀴즈 정보 API : 47. Get - http://IPAddress/api/quiz/get/listbyquizid?quizId=
    GetQuizListbyQuizIdAPI: resourceHost + "/api/quiz/get/listbyquizid?quizId=",
}

export const Server = {
    // 서버 아이피 등록 API : 18. Post - http://IPAddress/api/server/post/createserver
    PostCreateServerAPI: resourceHost + "/api/server/post/createserver",
    // 서버 아이피 리스트 API : 19. Post - http://IPAddress/api/server/post/listserver
    PostListServerAPI: resourceHost + "/api/server/post/listserver",
    // 강좌 예정인 강좌 리스트 API : 20. Get - http://IPAddress/api/server/get/findlectureinfo?instructorId=
    GetFindLectureInfoAPI: resourceHost + "/api/server/get/findlectureinfo?instructorId=",
    // 서버 아이피 삭제 API : 21. Delete - http://IPAddress/api/server/delete/deleteserver
    DeleteDeleteServerAPI: resourceHost + "/api/server/delete/deleteserver",
    // 아이피 정보 호출 API : 38. Get - http://IPAddress/api/server/get/oneserver?lectureId=
    GetOneServerAPI: resourceHost + "/api/server/get/oneserver?lectureId=",
}

export const ServerIP = {
    // 아이피 생성이 필요한 강의 리스트 API : 30. Post - http://IPAddress/api/serverip/post/findlectureinfo
    PostFindLectureInfoAPI: resourceHost + "/api/serverip/post/findlectureinfo",
}

export const IP = {
    // 아이피 등록 API : 33. Post - http://IPAddress/api/ip/post/create
    PostCreateIPAPI: resourceHost + "/api/ip/post/create",
    // 아이피 삭제 API : 34. Get - http://IPAddress/api/ip/get/delete?id=
    GetDeleteIPAPI: resourceHost + "/api/ip/get/delete?id=",
    // 아이피 리스트 API : 35. Get - http://IPAddress/api/ip/get/list
    GetIPListAPI: resourceHost + "/api/ip/get/list",
}

export const Department = {
    // 부서 입력 API : 26. Post - http://IPAddress/api/department/post/postdepartment
    PostPostDepartmentAPI: resourceHost + "/api/department/post/postdepartment",
    // 부서 리스트 API : 27. Get - http://IPAddress/api/department/get/departmentlist
    GetDepartmentListAPI: resourceHost + "/api/department/get/departmentlist",
    // 부서 삭제 API : 28. Post - http://IPAddress/api/department/patch/deletedepartment
    PostDeleteDepartmentAPI: resourceHost + "/api/department/patch/deletedepartment",
}

export const Participation = {
    // 출석여부 저장 API : 36. Post - http://IPAddress/api/participation/post/getabsentlecture
    PostGetAbsentLectureAPI: resourceHost + "/api/participation/post/getabsentlecture",
    // 학생 강의실 입장 API : 37. Post - http://IPAddress/api/participation/post/joinLecture
    PostJoinLectureRoomAPI: resourceHost + "/api/participation/post/joinLecture",
    // 참여도 저장 API : 38. Post - http://IPAddress/api/participation/post/participationlevel
    PostParticipationLevelAPI: resourceHost + "/api/participation/post/participationlevel",
}

export const Send = {
    Mail: {
        // 메일 전송 API : 45. Post - http://IPAddress/api/mail/send
        PostMailSendAPI: resourceHost + "/api/mail/sendAll",
        // 수강 신청 성공 메일 API : 50. Post - http://IPAddress/api/mail/sendLectureSignUpSuccess
        PostSendLectureSignUpSuccessAPI: resourceHost + "/api/mail/sendLectureSignUpSuccess",
    },
    SMS: {
        // 문자 전송 API : 46. Post - http://IPAddress/api/sms/send
        PostSMSSendAPI: resourceHost + "/api/sms/send",
    }
}