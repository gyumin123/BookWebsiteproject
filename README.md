# 📖 감상평 공유 책 뷰어 시스템 README

<br>

## 프로젝트 소개

- Book Website Project(Book&Y)는  사용자가 도서를 효율적으로 관리하고, 읽고, 의견을 남기며 다양한 기능을 활용할 수 있는 플랫폼입니다. 사용자 경험을 개선하고 독서 커뮤니티를 활성화하기 위한 목적으로 설계되었습니다.

<br>

### 프로젝트 구조

```
├─Book
│  ├─.mvn
│  │  └─wrapper
│  ├─front
│  │  ├─public
│  │  │  └─image
│  │  └─src
│  │      └─components
│  │          ├─Banner
│  │          │  └─image
│  │          ├─BookDetail
│  │          ├─BookInfo
│  │          ├─Classification
│  │          ├─Data
│  │          ├─FileViewer
│  │          ├─FindID
│  │          ├─Group
│  │          ├─Home
│  │          │  └─image
│  │          ├─Login
│  │          ├─Membership
│  │          ├─Myhistory
│  │          ├─Mypage
│  │          ├─Plan
│  │          ├─Purchase
│  │          ├─PurchaseHistory
│  │          ├─SetPwd
│  │          ├─ShoppingCart
│  │          ├─Subscribe
│  │          └─Support
│  ├─src
│  │  ├─main
│  │  │  ├─java
│  │  │  │  └─com
│  │  │  │      └─book
│  │  │  │          ├─bookcomment
│  │  │  │          ├─cart
│  │  │  │          ├─communityjpa
│  │  │  │          ├─DTO
│  │  │  │          ├─group
│  │  │  │          ├─groupplan
│  │  │  │          ├─history
│  │  │  │          ├─memberjpa
│  │  │  │          ├─pagehistory
│  │  │  │          ├─purchase
│  │  │  │          ├─purchaseProgress
│  │  │  │          ├─support
│  │  │  │          └─testclass
│  │  │  │              ├─controller
│  │  │  │              ├─domain
│  │  │  │              ├─repository
│  │  │  │              └─service
│  │  │  └─resources
│  │  │      └─static
│  │  └─test
│  │      └─java
│  │          └─com
│  │              └─example
│  │                  └─book

```

## 실행하기
1. 프로젝트를 클론합니다.
   ```bash
   $ git clone git@github.com:0000yuyu/BookWebsiteproject.git
   ```
2. 리액트 환경을 시작합니다.
   ```bash
   $ cd book/front
   $ npm install
   $ npm start
   ```
3. MySQL을 설치하고, BOOK이라는 데이터베이스를 생성합니다.
   ```sql
   CREATE DATABASE BOOK;
   ```
4. application.properties 파일을 수정합니다.
- **경로**: `src/main/resources/application.properties`
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/BOOK
   spring.datasource.username=본인의 MySQL 사용자 이름으로 변경
   spring.datasource.password=본인의 MySQL 비밀번호로 변경
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   ```
6. 백엔드 애플리케이션을 실행합니다.
- **경로**: `src/main/java/com/book/BookApplication.java`
- IDE를 통해 `BookApplication.java` 파일을 실행합니다.
<br>

# 프로젝트 기술 스택

### 프론트엔드
- ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
- ![JSON](https://img.shields.io/badge/-JSON-000000?style=flat-square&logo=json&logoColor=white)

### 백엔드
- ![Java](https://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=white)
- ![Spring](https://img.shields.io/badge/-Spring-6DB33F?style=flat-square&logo=spring&logoColor=white)
- ![SQL](https://img.shields.io/badge/-SQL-4479A1?style=flat-square&logo=postgresql&logoColor=white)

### 주요 도구
- ![JDK17](https://img.shields.io/badge/-JDK%2017-007396?style=flat-square&logo=java&logoColor=white)
- ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
- ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
- ![Maven](https://img.shields.io/badge/-Maven-C71A36?style=flat-square&logo=apache-maven&logoColor=white)
- ![Tomcat](https://img.shields.io/badge/-Tomcat-F8DC75?style=flat-square&logo=apache-tomcat&logoColor=black)

### 협업 도구
- ![Jira](https://img.shields.io/badge/-Jira-0052CC?style=flat-square&logo=jira&logoColor=white)  
  프로젝트 관리 및 작업 추적을 위해 Jira를 사용했습니다.

- ![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white)  
  코드 형상 관리를 위해 GitHub를 사용했습니다.

<br>

### 브랜치

- main, code 브랜치로 나누어 개발을 하였습니다.
 - **main** 브랜치는 (....)
 - **code** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.

<br>




### 개발 기간

- 전체 개발 기간 : 2024.08.31 ~ 2024.12.03
- 프로젝트 전체 기획 : 2024.08.31 ~ 2024.09.23
- 기본 웹 페이지 구현 : 2024.10.01 ~ 2024.10. 15
- 책 상세페이지 및 구매,대여 구현 : 2024.10.23 ~ 11.29
- 전자책 뷰어 구현 : 2024. 11.18 ~ 12.03
- 그룹 플랜 기능 구현 : 2024.  11. 18 ~ 12.03

<br>

