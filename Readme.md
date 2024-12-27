# Nestjs install
```
1. npm i -g @nest/cli
2. nest new ${project name}
```

# Nest 기본 구조
```
eslintrc.js: 코드 정리 및 타입스크립트 가이드라인, 문법 체크
prettierrc: 코드 포멧터
nest-cli.json: next project 특정 설정 json 파일
tsconfig.json: 타입스크립트 컴파일 방식 정의
tsconfig.build.json: tsconfig.json 연장선. build 할 때 설정. "excludes"에서는 빌드할 때 필요없는 파일들 명시
```

# 파일 생성
### 모듈
```
nest g module ${module name}
```
### 컨트롤러
```
nest g controller ${controller name} --no-spec // 테스트 코드 제거
```
### 서비스
```
nest g service ${service name} --no-spec
```

# Providers?
```
Nest 기본 개념이다.
기본 Nest 클래스는 프로바이더로 취급.
종속성으로 주입 가능하다는 특징.
객체의 인스턴스 연결은 Nest 런타임 시스템에 위임.
Module 파일 providers 항목 안에 해당 Provider 주입.
```

# Service?
```
@Injectable 데코레이터로 감싸져서 모듈에 제공. 해당 서비스는 app 전체에서 사용 될 수 있다.
Controller에서 Dependency Injection 을 통해 사용 가능.
```

# model
```
model 정의 시 Class or Interface 로 정으 
Interface: 변수의 타입만을 체크
Class: 변수의 타입체크 & 인스턴스 생성 가능
```

# Pipe
```
설치 모듈: class-validator, class-transformer
https://github.com/typestack/class-validator 참고

 @Injectable 데코레이터로 주석이 달린 class
 데이터 변형,유효성을 위해 사용.
 client 요청을 수신하여 controller로 전달.

 - Hadler-level - 특정 핸들러 위 선언
 - Parameter-level - 특정 파라미터에 선언
 - Global-level - main.ts에 선언

```
### 내장 Pipe
```
ValidationPipe
ParseIntPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
DefaultValuePipe
```

### repository 분리 기준
```
1. 단순 조회 로직(find, findOne)만 필요 - 서비스
2. 복잡한 조건부 필터링이나 조인 쿼리가 필요 - 레포지토리
3. 동일한 조회 로직이 여러 서비스에서 사용 - 레포지토리
4. 조회 로직이 간단하고 한 서비스에서만 사용 - 서비스
5. 쿼리 최적화를 위해 빌더 사용이 필요 - 레포지토리
```

# Nest 미들웨어
```
Pipes: 유효성 검사 및 페이로드 변환
Filters: 에러처리 미들웨어
Guards: 인증 미들웨어
Interceptors: 응답 매핑, 캐시 관리, 요청 로깅과 같은 전후 미들웨어
```
### 미들웨어 호출 순서
```
middleware -> guard -> interceptor(before) -> pipe -> controller -> service -> controller -> interceptor(after) -> filter (if applicable) -> client
```