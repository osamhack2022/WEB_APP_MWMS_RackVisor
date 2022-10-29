# MWMS - 국방물자관리체계

<br/>

<div align='center'>

![Logo](<https://raw.githubusercontent.com/osamhack2022/WEB_APP_MWMS_RackVisor/master/WEB(FE)/mwms/src/images/logo.png>)

---

<img src='https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge&logo'>
<a href="https://github.com/osamhack2022-v2/WEB_APP_MWMS_RackVisor/blob/master/license.md"><img src='https://img.shields.io/badge/License-MIT-black?style=for-the-badge&logo'></a>

<a href="https://github.com/osamhack2022-v2/WEB_APP_MWMS_RackVisor/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/osamhack2022-v2/WEB_APP_MWMS_RackVisor?color=success"></a> <a href="https://github.com/osamhack2022-v2/WEB_APP_MWMS_RackVisor/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/osamhack2022-v2/WEB_APP_MWMS_RackVisor"></a> <a href="https://github.com/osamhack2022-v2/WEB_APP_MWMS_RackVisor/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/osamhack2022-v2/WEB_APP_MWMS_RackVisor"></a> <a href="https://github.com/osamhack2022-v2/WEB_APP_MWMS_RackVisor/search?l=JavaScript&type=code"><img alt="GitHub language count" src="https://img.shields.io/github/languages/count/osamhack2022-v2/WEB_APP_MWMS_RackVisor"></a>

---

<a href=''><img src='https://img.shields.io/badge/VIDEO-red?style=for-the-badge'></a> <a href='https://rackvisor.gitbook.io/mwms-git-book/'><img src='https://img.shields.io/badge/GIT BOOK-blue?style=for-the-badge'></a> <a href='https://topaz-echium-20b.notion.site/MWMS-c0ecac5ed3cc489284570ae1606e7a10'><img src='https://img.shields.io/badge/DOCS-gray?style=for-the-badge'></a>
<br/>

</div>

<div  align="center"><img src="docs\image\mwms-logo.PNG"></div>

<br/><br/>

> 군인**의**, 군인을 **위한**, 군인에 **의한** <br/>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; 창고 관리 시스템, &#160;&#160; **"국방물자관리체계"**

---

## <br/> :book: 목차

  <ol>
    <li><a href="#introduction-project"> 프로젝트 소개 (Intro)</a></li>
    <li><a href="#introduction-function"> 기능설명 </a></li>
    <li><a href="#how-to-install"> 설치 안내 </a></li>
    <li><a href="#how-to-use"> 프로젝트 사용법 </a></li>
    <li><a href="#prerequisites"> 컴퓨터 구성 / 필수 조건 안내</a></li>
    <li><a href="#techniques"> 기술 스택</a></li>
    <li><a href="#team"> 팀 정보</a></li>
    <li><a href="#license"> 저작권 및 정보</a></li>
  </ol>

<br/>

---

<h2 id='introduction-project'> :books: 프로잭트 소개</h2>

<h4> :bulb: 배경 상황 </h4>

> 창고? 어땠냐고? 지옥 같았지...<br/>
> 창고 물자 관리를 어떻게 하냐고? 그냥 그때그때마다 세고 있어 <br/>
> 창고 항상 그거 난장판이야 그거 <br/>
> 혹시 XX 어디있는지 아십니까? 그거는 이제 창고 저어쪽 구석에 ... <br/>

군부대의 수많은 군수품들을 관리하는 창고, 각 창고는 모두 올바르게 관리되고 있을까요? <br/>
상급제대로부터 받은 군수품 혹은 필요할 때마다 그때그때 받은 모든 물품들은 창고에 저장되는데요 <br/>
그렇다면 저장된 물품들의 상태와 수량, 종류, 위치를 모두 정확하게 최신화 하고 있을까요? <br/>
수많은 부대에서 아직도 보급담당 계원들만 골머리를 앓는채 그대로 유지되는게 맞을까요? <br/>
더이상 그때그때 정리하고 보여주기를 위해서만 창고정리는 그만 <br/>
한번 정리하고 앞으로 쭉 관리하기 위한, **`국방물자관리체계`** <br/>
<br/>

<h4> :+1: 특징 </h4>

**`단순한 UI`**, 기능적으로 복잡하지 않고, 기존의 창고를 있는 그대로 본뜨기 위한 간단한 **`창고 관리`**<br/><br/>
일괄 추가 일괄 제거, 그리고 세부적인 검색이 가능한 물자 관리<br/><br/>
검색은 이젠 그만! **`QR 코드`** 를 통한 간편한 인식과 재고 확인<br/><br/>
이거 벌써 유통기한 지났네? **`알람기능`** 을 통한 유통기한 임박 물품 리스트 확인<br/><br/>
이걸 언제 다쓴거지? **`히스토리`** 확인<br/><br/>

<br/>

---

<h2 id="introduction-function"> :page_with_curl: 기능 설명</h2>

- <h4>창고 관리</h4>

<table width="900">

<tr>
<td width ="450" align="center"><img src="docs\gif\cabinet.gif" width=100%"></td>
<td width ="450" align="center">기존 부대의 각 창고의<br/> <b>모양</b>을 본뜨기 위해서 <br/> 간단한 UI 를 통해 <br/> <b>창고의 모양</b>을 생성하는 기능</td>
</tr>

<tr>
<td width ="450" align="center">창고 속 층과 구역을<br/> 간단히 나눠<br/> 그 누구든 검색한 위치로<br/> 쉽게 찾아갈 수 있도록 하는<br/> <b>창고 관리</b> 기능</td>
<td width ="450" align="center"><img src="docs\gif\box.gif" width="100%"></td>
</tr>

</table>
<br/>

- <h4>물자 추가</h4>

<table width="900">

<tr>
<td width ="450" align="center"><img src="docs\gif\save.gif" width=100%"></td>
<td width ="450" align="center">웹 사이트를 통한 <b>수동 추가</b> 또는<br/> 기존의 델리스 체계와의 호환을 위한<br/> <b>엑셀 맞춤형 물자 추가</b></td>
</tr>

</table>
<br/>

- <h4>강력한 검색과 바코드 기능</h4>

<table width="900">

<tr>
<td width ="450" align="center">사용 가능 기한,<br> 담당자 등을 바탕으로 하여<br> 세부 특성에 맞춘 <b>검색 기능</b>과<br>창고와 창고별 위치를 바탕으로<br> <b>위치별 물자 검색</b></td>
<td width ="450" align="center"><img src="docs\gif\search.gif" width=100%"></td>
</tr>
<tr>
<td width ="450" align="center"><img src="docs\gif\barcode.gif" width="100%"></td>
<td width ="450" align="center">특정 물품에 가시성 있도록<br> <b>바코드</b>를 부착하여 간단한 관리<br><br>물자가 보관된 박스에 이를 조회해<br> 들어있어야 하는 물품을 조회하거나<br> 박스 이름을 <b>조회</b> 가능한 기능</td>
</tr>
</table>
<br/>

- <h4>히스토리 및 알람</h4>

<table width="900">

<tr>
<td width ="450" align="center"><img src="docs\gif\history.gif" width="100%"></td>
<td width ="450" align="center">부대 물품이 <b>변동된 기록</b>을 확인하여<br> 사용처와 사용량을 체크할 수 있음</td>
</tr>

</table>

<br/>

- <h4>앱 제공</h4>

<table width="900">

<tr>
<td width ="450" align="center">단순 웹사이트만 제공하는<br/>  체계들과 달리 <b>휴대폰</b>을 활용하여<br/>  창고에 직접 접속하여 <b>물품의 리스트</b>를 확인<br/> <b>QR 코드</b>를 인식하여 조회할 수 있는 <br/> <b>QR코드 검색 기능</b>을 지니고 있음</td>
<td width ="450" align="center"><img src="docs\gif\app.gif" width=60%"></td>
</tr>

</table>
<br/>

- <h4>알람과 공지사항 기능</h4>

<table width="900">

<tr>
<td width ="450" align="center"><img src="docs\gif\post.gif" width=100%"></td>
<td width ="450" align="center">부대에 속한 물품들이<br/> <b>유통기한</b>이 임박했을 경우<br/> 이를 확인할 수 있음, <br/>또한 부대 내 <b>전파사항</b>이 있을 경우<br/> <b>공지사항</b> 게시판을 통해 <br/>서로에게 전파할 수 있음</td>
</tr>

</table>

<br/><br/>

<br/>

---

<h2 id="how-to-install"> :wrench: 설치 안내 (Installation Process)</h2>

<h4>서버 설치</h4>

```bash
$ git clone git주소
$ cd WEB(BE)
$ yarn install
$ yarn start or yarn dev
```

<br/>
<h4>프론트-웹 설치</h4>
```bash
$ git clone git주소
$ cd WEB(FE)
$ npm i
$ npm start
```
<br/>
<h4>프론트-앱 설치</h4>
```bash
$ git clone git주소
$ cd APP(FE)
$ flutter build apk --release --target-platform=android-arm64   (Android)
$ ...or
$ flutter build ipa                                              (ios)
```
<br/>

---

<h2 id="how-to-use"> :mag_right: 프로젝트 사용법 (Getting Started)</h2>

<a href="https://rackvisor.gitbook.io/mwms-git-book/undefined-3/undefined"><img src="docs/image/gitbook-how-to-use.png"></a>
상단 이미지를 클릭하여 `GIT-BOOK:프로젝트 사용법`으로 이동할 수 있습니다.

---

<h2 id="prerequisites">:computer: 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)</h2>

<h4> :earth_asia: 브라우저 </h4>

- ECMAScript 6 지원 브라우저 사용
- 권장: Google Chrome 버젼 77 이상

<table width="900">

<thead>

<tr>

<th width="180" align="center"><img src="docs\icons\chrome.ico" alt="Chrome" width="20px" height="20px" /> Chrome</th>

<th width="240" align="center"><img src="docs\icons\ie.ico" alt="IE" width="20px" height="20px" /> Internet Explorer</th>

<th width="180" align="center"><img src="docs\icons\edge.ico" alt="Edge" width="20px" height="20px" /> Edge</th>

<th width="180" align="center"><img src="docs\icons\safari.ico" alt="Safari" width="20px" height="20px" /> Safari</th>

<th width="180" align="center"><img src="docs\icons\firefox.ico" alt="Firefox" width="20px" height="20px" /> Firefox</th>

</tr>

</thead>

<tbody>

<tr>
<td align="center">YES</td>
<td align="center">11+</td>
<td align="center">YES</td>
<td align="center">YES</td>
<td align="center">YES</td>
</tr>

</table>

<br/>

---

<h2 id="techniques">:hammer: 기술 스택 (Technique Used)</h2>

<img src="docs/image/tech-stack.png">

### Server(back-end)

**1. DB, Framework**
DB는 RDBMS의 [MySQL](https://www.mysql.com/)을 사용하였고, 서버 프레임워크는 Node.js기반의 [Fastify](https://www.fastify.io/)를 사용하여 개발 편의성을 높였습니다.  
서비스의 특성상 테이블간 Relation 구성이 매우 중요하기 때문에, 본격적인 개발 시작에 앞서 DB 설계에 많은 시간을 투자했습니다.
<br/>

**2. ORM**
MySQL - Fastify간의 ORM으로 [Prisma](https://github.com/prisma/prisma)를 사용했습니다. Prisma는 다양한 종류의 DB들을 서로 비슷한 문법으로 개발할 수 있도록 해주는 ORM입니다.  
`npx primsa generate`로 DB Schema에 맞는 Typescript 타입 정의 파일을 생성할 수 있고, `npx prisma migrate` 한번으로 Schema에 맞게 연결된 DB의 테이블을 자동으로 조작해줍니다.
<br/>

**3. Swagger for API Docs**
백엔드는 프론트엔드 개발자들과 협업을 하기 위해 각각의 API에 대한 스펙을 적절한 방법으로 전달해야 합니다.  
그 중 API Route별로 Response, Request Body의 형태를 상세히 기술한 API Document를 제작하는 경우가 흔한데, 이를 자동으로 생성해주는 `Swagger`을 사용했고, 그 중에서도 서버 프레임워크인 Fastify에 맞는 [Fastify Swagger](https://github.com/fastify/fastify-swagger)을 사용하였습니다.
<br/>

### Front-end

**1. Framework**
웹 프론트 개발 때 사용한 Framework는 [React](https://ko.reactjs.org/)와 [TailWind](https://tailwindcss.com/)입니다.
React를 사용하여 JS 기반으로 웹 컴포넌트들을 구성하여 서버와 연동하였고, 창고 관리라는 프로젝트의 방향성에 맞추어 직관적인 UI를 구성하고자 TailWind라는 CSS 프레임워크를 사용하였습니다.
<br/>

### App

**1. Framwork**
앱 개발시 사용한 Framework는 [Flutter](https://flutter-ko.dev/)입니다.
웹 사용시 보조적인 사용 도구로 앱이 필요하기 때문에 android, ios 둘 다 사용이 가능하도록 Flutter를 이용해 크로스 플랫폼 개발을 진행하였습니다. 또한, 웹과 비슷한 목적으로 사용성을 높이기 위해 UI의 직관성을 높이고자 하였습니다.

<br/>

---

<h2 id="team">:runner: :runner: 팀 정보 (Team Information)</h2>

> **RackVisor** <br>가상 현실(VM) 속 창고(RACK) 을 다루는 프로그램(HYPERVISOR) 처럼 군대 속 창고들을 쉽게 다룰 수 있는 프로젝트를 만들기 위해 모인 팀입니다.

<br/>

<table width="900">

<thead>

<tr>

<th width="100" align="center">Name</th>

<th width="250" align="center">Role</th>

<th width="150" align="center">Github</th>

<th width="300" align="center">E-mail</th>

</tr>

</thead>

<tbody>

<tr>
<td width="100" height="55" align="center">제태호<br>(팀장)</td>
<td width="250">Product Manager<br>FrontEnd Developer</td>
<td width="150" align="center">
<a href="https://github.com/stpcoder">
<img src="https://img.shields.io/badge/stpcoder-655ced?style=social&logo=github"/></a>
<td width="300" align="center"><a href="mailto:thbrian@postech.ac.kr"><img src="https://img.shields.io/static/v1?label=&message=thbrian@postech.ac.kr&color=lightgray&style=flat-square&logo=gmail"></a></td>
</tr>

<tr>
<td width="100" height="55" align="center">조영현</td>
<td width="250">BackEnd Developer</td>
<td width="150" align="center">
<a href="https://github.com/poxios">
<img src="https://img.shields.io/badge/poxios-655ced?style=social&logo=github"/></a>
<td width="300" align="center"><a href="mailto:poxios0310@gmail.com"><img src="https://img.shields.io/static/v1?label=&message=poxios0310@gmail.com&color=lightgray&style=flat-square&logo=gmail"></a></td>
</tr>

<tr>
<td width="100" height="55" align="center">이현우</td>
<td width="250">BackEnd Developer</td>
<td width="150" align="center">
<a href="https://github.com/lhw414">
<img src="https://img.shields.io/badge/lhw414-655ced?style=social&logo=github"/></a>
<td width="300" align="center"><a href="mailto:dlgusdn0414@snu.ac.kr"><img src="https://img.shields.io/static/v1?label=&message=dlgusdn0414@snu.ac.kr&color=lightgray&style=flat-square&logo=gmail"></a></td>
</tr>

<tr>
<td width="100" height="55" align="center">이원형</td>
<td width="250">App Developer</td>
<td width="150" align="center">
<a href="https://github.com/codingle2">
<img src="https://img.shields.io/badge/codingle2-655ced?style=social&logo=github"/></a>
<td width="300" align="center"><a href="mailto:5292k@naver.com"><img src="https://img.shields.io/static/v1?label=&message=5292k@naver.com&color=lightgray&style=flat-square&logo=gmail"></a></td>
</tr>

<tr>
<td width="100" height="55" align="center">여호영</td>
<td width="250">App Developer</td>
<td width="150" align="center">
<a href="https://github.com/YEOHOYEONG">
<img src="https://img.shields.io/badge/YEOHOYEONG-655ced?style=social&logo=github"/></a>
<td width="300" align="center"><a href="mailto:hoyeong3273@naver.com"><img src="https://img.shields.io/static/v1?label=&message=hoyeong3273@naver.com&color=lightgray&style=flat-square&logo=gmail"></a></td>
</tr>

<tr>
<td width="100" height="55" align="center">정유환</td>
<td width="250">Designer</td>
<td width="150" align="center">
<a href="https://github.com/yh2369">
<img src="https://img.shields.io/badge/yh2369-655ced?style=social&logo=github"/></a>
<td width="300" align="center"><a href="mailto:yuhwan012@gmail.com"><img src="https://img.shields.io/static/v1?label=&message=yuhwan012@gmail.com&color=lightgray&style=flat-square&logo=gmail"></a></td>
</tr>

</table>

<br/>

---

<h2 id="license">저작권 및 사용권 정보 (Copyleft / End User License)</h2>

- [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.

<br/>

---

<h2>더 자세한 정보...</h2>

더 자세한 정보는 [GIT-BOOK]()을 통해 확인하세요!
