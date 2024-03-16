<!-- 获奖登记编辑弹窗 -->
<template>
  <div class="ele-body">
    <a-card :bordered="false" :title="awardModalApp.title">
      <a-form
        ref="form2"
        :label-col="{md: {span: 10}, sm: {span: 24}}"
        :model="awardModalApp.award"
        :rules="awardModalApp.rules"
        :wrapper-col="{md: {span: 14}, sm: {span: 24}}">
        <a-row :gutter="16">
          <a-row class="gerenxinxiDIV">
            <a-p class="tip">个人信息</a-p>
            <a-col :lg="24" :md="8" :sm="24" :xs="24"></a-col>
            <a-col :lg="8" :md="8" :sm="24" :xs="24">
              <a-form-item label="负责人姓名:" name="firstAwardeeId">
                <!--              <m-entity-select-->
                <!--                :default-value="awardModalApp.award.firstAwardeeName"-->
                <!--                v-model:value="awardModalApp.award.firstAwardeeId"-->
                <!--                @change="findStudentInfo(awardModalApp.award.firstAwardeeId)"-->
                <!--                placeholder="请选择负责人"-->
                <!--                module="studentEntity"-->
                <!--                entity="StudentInfo"-->
                <!--                class="ele-fluid"-->
                <!--                sys="ams"-->
                <!--                disabled="disabled"-->
                <!--              />-->
                <a-p
                  v-model:value="awardModalApp.award.firstAwardeeId"
                  :default-value="awardModalApp.award.firstAwardeeName"
                  @change="findStudentInfo(awardModalApp.award.firstAwardeeId)"
                >
                  {{ awardModalApp.award.firstAwardeeName }}
                </a-p>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="负责人学院:" name="collegeId">
                <!--              <m-entity-select-->
                <!--                :default-value="awardModalApp.award.collegeName"-->
                <!--                v-model:value="awardModalApp.award.collegeId"-->
                <!--                placeholder="请选择负责人学院"-->
                <!--                module="collegeEntity"-->
                <!--                entity="College"-->
                <!--                class="ele-fluid"-->
                <!--                disabled="false"-->
                <!--                sys="ams"-->
                <!--              />-->
                <a-p
                  v-model:value="awardModalApp.award.collegeId"
                  :default-value="awardModalApp.award.collegeName"
                >
                  {{ awardModalApp.award.collegeName }}
                </a-p>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="负责人专业:" name="major">
                <!--              <a-input-->
                <!--                v-model:value="awardModalApp.award.major"-->
                <!--                placeholder="请输入负责人专业"-->
                <!--                :maxlength="255"-->
                <!--                allow-clear-->
                <!--                disabled="disabled"-->
                <!--              />-->
                <a-p
                  v-model:value="awardModalApp.award.major"
                >
                  {{ awardModalApp.award.major }}
                </a-p>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="负责人年级:" name="grade">
                <!--              <a-input-->
                <!--                v-model:value="awardModalApp.award.grade"-->
                <!--                placeholder="请输入负责人年级"-->
                <!--                :maxlength="255"-->
                <!--                allow-clear-->
                <!--                disabled="disabled"-->
                <!--              />-->
                <a-p
                  v-model:value="awardModalApp.award.grade"
                >
                  {{ awardModalApp.award.grade }}
                </a-p>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="负责人电话:" name="contactTel">
                <!--              <a-input-->
                <!--                v-model:value="awardModalApp.award.contactTel"-->
                <!--                placeholder="请输入负责人联系电话"-->
                <!--                :maxlength="255"-->
                <!--                allow-clear-->
                <!--                disabled="disabled"-->
                <!--              />-->
                <a-p
                  v-model:value="awardModalApp.award.contactTel"
                >
                  {{ awardModalApp.award.contactTel }}
                </a-p>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="8" :sm="24" :xs="24">
            </a-col>
          </a-row>

          <a-row class="jingsaixinxiDIV">
            <a-p class="tips">奖项信息</a-p>
            <a-col :lg="24" :md="8" :sm="24" :xs="24"></a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="竞赛名称:" name="competitionNameId">
                <m-entity-select
                  v-model:value="awardModalApp.award.competitionNameId"
                  :default-value="awardModalApp.award.competitionNameName"
                  class="ele-fluid"
                  entity="Competition"
                  module="competitionEntity"
                  placeholder="请选择获奖竞赛名称"
                  sys="ams"
                  @change="findCompetitionInfo(awardModalApp.award.competitionNameId)"
                />
              </a-form-item>
            </a-col>
            <a-p class="addAwardTips">未找到竞赛名称：</a-p>
            <a-col :lg="8" :md="8" :sm="24" :xs="24">
              <!--  按钮（新增竞赛弹窗）-->
              <vxe-toolbar>
                <template #buttons>
                  <vxe-button class="addButton" status="primary"
                              style="margin-bottom: 14px;" @click="competitions.showValue = true">新增竞赛信息
                  </vxe-button>
                </template>
              </vxe-toolbar>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="参赛队名:" name="workName">
                <a-input
                  v-model:value="awardModalApp.award.workName"
                  :maxlength="255"
                  allow-clear
                  placeholder="请输入参赛队名或者作品名"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="获奖日期:" name="awardDate">
                <a-date-picker
                  v-model:value="awardModalApp.award.awardDate"
                  class="ele-fluid"
                  placeholder="请选择获奖日期"
                  :getCalendarContainer="triggerNode => triggerNode.parentNode"
                  value-format="YYYY-MM-DD H:m:s"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="证书编号:" name="certificateNo">
                <a-input
                  v-model:value="awardModalApp.award.certificateNo"
                  :maxlength="255"
                  allow-clear
                  placeholder="请输入证书编号"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="竞赛组别:" name="competitionGroup">
                <a-input
                  v-model:value="awardModalApp.award.competitionGroup"
                  :maxlength="255"
                  allow-clear
                  placeholder="请输入竞赛组别"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="获奖级别:" name="awardLevel">
                <m-dict-select
                  v-model:value="awardModalApp.award.awardLevel"
                  dict="获奖级别"
                  placeholder="请选择获奖级别"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="获奖等级:" name="awardGrade">
                <m-dict-select
                  v-model:value="awardModalApp.award.awardGrade"
                  dict="获奖等级"
                  placeholder="请选择获奖等级"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="竞赛类别:" name="competitionCategory">
                <m-dict-select
                  v-model:value="awardModalApp.award.competitionCategory"
                  dict="竞赛类别"
                  disabled="disabled"
                  placeholder="请选择竞赛类别"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="举办单位:" name="organizationId">
                <m-entity-select
                  v-model:value="awardModalApp.award.organizationId"
                  :default-value="awardModalApp.award.organizationName"
                  class="ele-fluid"
                  disabled="disabled"
                  entity="Unit"
                  module="unitEntity"
                  placeholder="请选择举办单位"
                  sys="ams"
                />
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="单位等级:" name="competitionLevel">
                <m-dict-select
                  v-model:value="awardModalApp.award.competitionLevel"
                  dict="举办单位等级"
                  disabled="disabled"
                  placeholder="请选择举办单位等级"/>
              </a-form-item>
            </a-col>
            <a-col :lg="24" :md="8" :sm="24" :xs="24">
            </a-col>
          </a-row>

          <a-row class="huojiangxueshengDIV">
            <a-p class="tips">获奖学生</a-p>
            <a-col :lg="24" :md="8" :sm="12" :xs="12"></a-col>
            <a-p class="addtips">若团队获奖请添加队员：</a-p>
            <a-col :lg="7" :md="8" :sm="12" :xs="12">
              <!--  所有获奖学生-->
              <a-select
                v-model:value="value"
                :filter-option="false"
                :options="studentData"
                allowClearx
                defaultActiveFirstOption
                notFoundContent="该学生未注册"
                placeholder="请输入队员学号"
                show-search
                style="width: 250px;"
                @blur="handleBlur"
                @click="handleChange()"
                @focus="handleFocus"
                @search="fetchStudents"
                :getPopupContainer="
          triggerNode => {
            return triggerNode.parentNode || document.body;
          }
       "

              >
                <!--                <template>
                                  <a-spin size="big"/>
                                </template>-->
              </a-select>

            </a-col>
            <a-col :lg="4" :md="8" :sm="12" :xs="12">
              <vxe-toolbar>
                <template #buttons>
                  <vxe-button status="primary"
                              style="text-align: center;margin-left: -60px;margin-bottom: 20px"
                              @click="addStudent(value)">点击添加
                  </vxe-button>
                </template>
              </vxe-toolbar>
            </a-col>
            <!--            <a-col :lg="24" :md="8" :sm="24" :xs="24"></a-col>-->
            <a-p class="addStudentTips">未找到队员信息：</a-p>
            <a-col :lg="4" :md="8" :sm="12" :xs="12">
              <vxe-toolbar>
                <template #buttons>
                  <vxe-button content="新增队员信息" status="primary"
                              @click="students.showValue = true" class="addStudentButton"></vxe-button>
                </template>
              </vxe-toolbar>
            </a-col>

            <!--            <a-p class="tableName">表（1）所有获奖学生表</a-p>-->
            <a-col :lg="6" :md="12" :sm="24" :xs="24"></a-col>
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <vxe-grid ref='xGrid' v-bind="gridOptions" class="studentsList">
                <vxe-column v-model="row.displayIndex" field="displayIndex" style="width: 180px"></vxe-column>
                <vxe-column v-model="row.name" field="name" style="width: 180px"></vxe-column>
                <vxe-column v-model="row.studentId" field="studentId" style="width: 180px"></vxe-column>
                <vxe-column v-model="row.major" field="major" style="width: 180px"></vxe-column>
                <!--    <vxe-column v-model="row.grade" field="grade"></vxe-column>-->
                <!--    <vxe-column v-model="row.classGrade" field="classGrade"></vxe-column>-->
                <template #operate="{ row }">
                  <a-space>
                    <a-popconfirm
                      title="确定要移除此记录吗？"
                      @confirm="deleteEvent(row)">
                      <a class="ele-text-danger" style="width: 180px">移除</a>
                    </a-popconfirm>
                  </a-space>
                </template>
              </vxe-grid>
            </a-col>

          </a-row>

          <a-row class="zhidaolaoshiDIV">
            <a-col :lg="24" :md="16" :sm="24" :xs="24"></a-col>
            <a-p class="tips">指导教师</a-p>
            <a-col :lg="24" :md="8" :sm="24" :xs="24"></a-col>

            <a-p class="addtips">请先选择第一指导教师：</a-p>
            <a-col :lg="7" :md="8" :sm="12" :xs="12">
              <m-entity-select
                v-model:value="awardModalApp.award.firstInstructorId"
                :default-value="awardModalApp.award.firstInstructorName"
                entity="TeacherInfo"
                module="teacherEntity"
                placeholder="请选择第一指导教师"
                sys="ams"
                @change="addTeacherToForm(awardModalApp.award.firstInstructorId)"
                style="width: 250px;"
              />
            </a-col>
            <a-col :lg="16" :md="8" :sm="24" :xs="24">
            </a-col>
            <a-col :lg="24" :md="8" :sm="24" :xs="24"></a-col>
            <br><br>

            <a-p class="addtips">添加其他指导教师信息：</a-p>
            <a-col :lg="7" :md="8" :sm="24" :xs="24">
              <a-select
                v-model:value="teacherValue"
                :filter-option="false"
                :options="teacherData"
                allowClearx
                defaultActiveFirstOption
                notFoundContent="该教师信息未录入"
                placeholder="请输入指导教师工号"
                show-search
                style="width: 250px"
                @blur="handleBlur"
                @focus="handleFocus"
                @search="fetchTeachers"
                :getPopupContainer="
                  triggerNode => {
                    return triggerNode.parentNode || document.body;
                   }
                  "
              >
                <template>
                  <a-spin size="big"/>
                </template>
              </a-select>
            </a-col>
            <a-col :lg="4" :md="8" :sm="24" :xs="24">
              <vxe-toolbar>
                <template #buttons>
                  <vxe-button status="primary"
                              style="text-align: center;margin-left: -60px;margin-bottom: 19px;"
                              @click="addTeacher(teacherValue)">点击添加
                  </vxe-button>
                </template>
              </vxe-toolbar>
            </a-col>
            <!--            <a-col :lg="7" :md="8" :sm="24" :xs="24">-->
            <!--            </a-col>-->
            <a-p class="addTeacherTips">未找到教师信息：</a-p>
            <a-col :lg="4" :md="8" :sm="12" :xs="12">
              <vxe-toolbar>
                <template #buttons>
                  <vxe-button status="primary" @click="teachers.showValue = true"
                              style="margin-bottom: 20px;">
                    新增教师信息
                  </vxe-button>
                </template>
              </vxe-toolbar>
            </a-col>
            <a-col :lg="16" :md="8" :sm="24" :xs="24">
            </a-col>

            <!--            <a-p class="tableName">-->
            <!--              表（2）所有指导教师表 [备注：序号与顺序无关，以第一指导教师选择框为准]-->
            <!--            </a-p>-->
            <a-col :lg="6" :md="12" :sm="24" :xs="24"></a-col>
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <vxe-grid ref='txGrid' v-bind="gridOptionsTeacher" class="studentsList">
                <vxe-column v-model="row.displayIndex" field="displayIndex" style="width: 20%;"></vxe-column>
                <vxe-column v-model="row.name" field="name" style="width: 20%;"></vxe-column>
                <vxe-column v-model="row.studentId" field="studentId" style="width: 20%;"></vxe-column>
                <vxe-column v-model="row.email" field="email" style="width: 20%;"></vxe-column>

                <template #operate="{ row }">
                  <a-space>
                    <a-popconfirm
                      title="确定要移除此记录吗？"
                      @confirm="deleteEventTeacher(row)">
                      <a class="ele-text-danger" style="width: 20%;">移除</a>
                    </a-popconfirm>
                  </a-space>
                </template>
              </vxe-grid>
            </a-col>
          </a-row>

          <a-row class="zhengmingcailiaoDIV">
            <a-col :lg="24" :md="8" :sm="24" :xs="24"></a-col>
            <a-p class="tips">证明材料</a-p>
            <a-col :lg="24" :md="8" :sm="24" :xs="24">
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="上传文件命名:">
                <img src="@/assets/fileTip.png" style="width: 140%;height: 80%;">
                <a-button type="primary" @click="downloadMould" style="left: 27%;">资源包模板下载</a-button>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="8" :sm="24" :xs="24">
            </a-col>
            <a-col :lg="10" :md="12" :sm="24" :xs="24" style="color: red">

              <a-form-item label="上传奖状:" :label-col="{span:6}" :wrapper-col="{span:18}" style="color: red;">
                <m-attachment
                  :associate-form-id=" awardListApp.currentId"
                  associate-form-name="award"
                  v-on:fileList="fileListFromParent"
                  :operator-type="operatorType"
                  ref="attachment"
                />
                <a-p class="theTip">（只能上传一张图片且大小不超过30M）</a-p>
              </a-form-item>

              <a-form-item label="上传资源包:" :label-col="{span:6}" :wrapper-col="{span:18}" style="color: red;">
                <my-attachment
                  :associate-form-id="awardListApp.currentId"
                  associate-form-name="award"
                  v-on:fileList="fileListFromParentMy"
                  :operator-type="operatorType"
                  ref="attachment1"
                />

                <a-p class="theTip">（只能上传一个资源包且大小不超过100M）</a-p>
              </a-form-item>


            </a-col>

            <a-col :lg="24" :md="8" :sm="24" :xs="24"></a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="上传奖状示例图:">
                <img src="@/assets/myAward.jpg" style="width: 100%;height: 80%;">
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24" style="margin-left: 20%">
              <a-form-item label="上传资源包示例图:">
                <img src="@/assets/zip.png" style="width: 80%;height: 50%;">
              </a-form-item>
            </a-col>
          </a-row>

          <a-col :md="12" :sm="24" :xs="24">
            <a-form-item :wrapper-col="{md: {offset: 6}}">
              <!--class="ele-pull-right"-->
              <div v-if="awardModalApp.display">
                <teleport to="#awardEditModalFooter">
                  <div>
                    <a-space size="middle">
                      <a-button @click="awardListApp.editModalShowing=false">取消
                      </a-button>
                      <a-button
                        :loading="loading"
                        type="primary"
                        @click="onSubmit(awardModalApp.award)">提交
                      </a-button>
                    </a-space>
                  </div>
                </teleport>
              </div>
              <div v-if="!awardModalApp.display">
                <a-space size="middle">
                  <a-button @click="onBack()">返回列表</a-button>
                  <a-button
                    type="primary"
                    @click="onSubmit(awardModalApp.award)">提交
                  </a-button>
                </a-space>
              </div>

            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

  </div>

  <br>

  <!--  新增学生-->
  <vxe-modal v-model="students.showValue" height="430" remember resize show-zoom title="新增队员学生信息" width="600">
    <template #default>
      <vxe-form :data="students.studentInfo" :rules="students.rules" title-align="right" title-width="60">
        <vxe-form-item :title-prefix="{icon: 'fa fa-address-card-o'}" span="24" title="基本信息" title-align="left"
                       title-width="200px"></vxe-form-item>
        <vxe-form-item field="name" span="12" title="姓名">
          <template #default>
            <vxe-input v-model="students.studentInfo.name" placeholder="请输入队员姓名"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="studentId" span="12" title="学号">
          <template #default>
            <vxe-input v-model="students.studentInfo.studentId" placeholder="请输入队员学号"
                       @blur="StudentIdOfMemberToBlur()"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="collegeId" span="12" title="学院">
          <template #default>
            <m-entity-select
              v-model:value="students.studentInfo.collegeId"
              :default-value="students.studentInfo.collegeName"
              class="ele-fluid"
              entity="College"
              module="collegeEntity"
              placeholder="请选择队员学院"
              sys="ams"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item field="major" span="12" title="专业">
          <template #default>
            <vxe-input v-model="students.studentInfo.major" placeholder="请输入队员专业"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="grade" span="12" title="年级">
          <template #default>
            <vxe-input v-model="students.studentInfo.grade" placeholder="请输入队员年级"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="classGrade" span="12" title="班级">
          <template #default>
            <vxe-input v-model="students.studentInfo.classGrade" placeholder="请输入队员班级"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="contactTel" span="12" title="电话">
          <template #default>
            <vxe-input v-model="students.studentInfo.contactTel" placeholder="请输入队员电话"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="email" span="12" title="邮箱">
          <template #default>
            <vxe-input v-model="students.studentInfo.email" placeholder="请输入队员邮箱"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="remark" span="12" title="类型">
          <a-select
            placeholder="请选择学生类型"
            v-model:value="students.studentInfo.remark">
            <a-select-option :value="1">本科生</a-select-option>
            <a-select-option :value="2">研究生</a-select-option>
          </a-select>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <template #default>
            <vxe-button @click="onSubmitStudentInfo(students.studentInfo)">提交</vxe-button>
            <vxe-button @click="students.showValue = false">取消</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </template>
  </vxe-modal>

  <!--  新增教师-->
  <vxe-modal v-model="teachers.showValue" height="300" remember resize show-zoom title="新增指导教师信息" width="600">
    <template #default>
      <vxe-form :data="teachers.teacherInfo" :rules="teachers.rules" title-align="right" title-width="60">
        <vxe-form-item :title-prefix="{icon: 'fa fa-address-card-o'}" span="24" title="基本信息" title-align="left"
                       title-width="200px"></vxe-form-item>
        <vxe-form-item field="name" span="12" title="姓名">
          <template #default>
            <vxe-input v-model="teachers.teacherInfo.name" placeholder="请输入教师姓名"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="teacherId" span="12" title="工号">
          <template #default>
            <vxe-input v-model="teachers.teacherInfo.teacherId" placeholder="请输入教师工号"
                       @blur="teacherIdIsOnly"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="collegeId" span="12" title="学院">
          <template #default>
            <m-entity-select
              v-model:value="teachers.teacherInfo.collegeId"
              :default-value="teachers.teacherInfo.collegeName"
              class="ele-fluid"
              entity="College"
              module="collegeEntity"
              placeholder="请选择教师学院"
              sys="ams"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item field="email" span="12" title="邮箱">
          <template #default>
            <vxe-input v-model="teachers.teacherInfo.email" placeholder="请输入教师邮箱"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <template #default>
            <vxe-button @click="onSubmitTeacherInfo(teachers.teacherInfo)">提交</vxe-button>
            <vxe-button @click="teachers.showValue = false">取消</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </template>
  </vxe-modal>

  <!--  新增竞赛-->
  <vxe-modal v-model="competitions.showValue" height="350" remember resize show-zoom title="新增竞赛信息" width="600">
    <template #default>
      <vxe-form :data="competitions.competition" :rules="competitions.rules" title-align="right" title-width="90">
        <vxe-form-item :title-prefix="{icon: 'fa fa-address-card-o'}" span="24" title="基本信息"
                       align="center"></vxe-form-item>
        <vxe-form-item field="name" span="12" title="竞赛名称">
          <template #default>
            <vxe-input v-model="competitions.competition.name" placeholder="请输入竞赛的完整名称"
                       @blur="competitionNameIsOnly"></vxe-input>
          </template>
        </vxe-form-item>

        <!--        <vxe-form-item field="awardLevel" span="12" title="获奖级别">
                  <template #default>
                    <m-dict-select
                      v-model:value="competitions.competition.awardLevel"
                      dict="获奖级别"
                      placeholder="请选择获奖级别"/>
                  </template>
                </vxe-form-item>-->
        <vxe-form-item field="competitionGroup" span="12" title="竞赛组别">
          <template #default>
            <vxe-input v-model="awardModalApp.award.competitionGroup" placeholder="请输入竞赛组别"></vxe-input>
          </template>
        </vxe-form-item>

        <vxe-form-item field="unitsId" span="12" title="举办单位">
          <template #default>
            <m-entity-select
              v-model:value="competitions.competition.unitsId"
              :default-value="competitions.competition.unitsName"
              class="ele-fluid"
              entity="Unit"
              module="unitEntity"
              placeholder="请选择举办单位"
              sys="ams"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item span="12" color="red" title="未找到举办单位">
          <vxe-button status="primary" @click="units.showValue = true">新增举办单位</vxe-button>
        </vxe-form-item>

        <vxe-form-item field="competitionCategory" span="12" title="竞赛类别">
          <template #default>
            <m-dict-select
              v-model:value="competitions.competition.competitionCategory"
              dict="竞赛类别"
              placeholder="请选择竞赛类别"/>
          </template>
        </vxe-form-item>

        <vxe-form-item field="competitionLevel" span="12" title="单位等级">
          <template #default>
            <m-dict-select
              v-model:value="competitions.competition.competitionLevel"
              dict="举办单位等级"
              placeholder="请选择举办单位等级"/>
          </template>
        </vxe-form-item>

        <vxe-form-item align="center" span="24">
          <template #default>
            <vxe-button @click="onSubmitCompetition(competitions.competition)">提交</vxe-button>
            <vxe-button @click="competitions.showValue = false">取消</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </template>
  </vxe-modal>

  <!--  新增主办单位-->
  <vxe-modal v-model="units.showValue" height="250" remember resize show-zoom title="新增举办单位" width="450">
    <template #default>
      <vxe-form :data="units.unit" :rules="units.rules" title-align="right" title-width="100">
        <vxe-form-item :title-prefix="{icon: 'fa fa-address-card-o'}" span="24" title="基本信息"
                       align="center"></vxe-form-item>
        <vxe-form-item field="name" span="18" title="举办单位" title-width="100px">
          <template #default>
            <vxe-input v-model="units.unit.name" placeholder="请输入举办单位名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <template #default>
            <vxe-button @click="onSubmitUnit(units.unit)">提交</vxe-button>
            <vxe-button @click="units.showValue = false">取消</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </template>
  </vxe-modal>

  <!--提示框-->
  <!--  这个上面-->
</template>

<script>
import {defineComponent, inject, reactive, onMounted, ref, toRefs, watch} from 'vue'
import {useRoute, useRouter} from "vue-router"
import {AwardService} from "@/views/ams/awardEntity/award/awardService";
import {VXETable} from 'vxe-table'
import {useStore} from "vuex";
//import regions from 'ele-admin-pro/packages/regions.js';
import {debounce} from 'lodash-es';

import MDictSelect from "@/components/MDict/dictSelect";
import MEntitySelect from "@/components/MEntity/entitySelect";
import {toRaw} from '@vue/reactivity'
import axios from "axios";
import setting from "@/config/setting";
import MAttachment from "@/components/MFileUpload/attachment";
import MyAttachment from "@/components/MFileUpload/attachment1";
import uploadAttachmentService from "@/components/MFileUpload/attachmentService.js";
import FileSaver from "file-saver";
import {StudentInfoService} from "@/views/ams/studentEntity/studentInfo/studentInfoService";
import {TeacherInfoService} from "@/views/ams/teacherEntity/teacherInfo/teacherInfoService";
import {CompetitionService} from "@/views/ams/competitionEntity/competition/competitionService"

export default defineComponent({

  components: {
    MDictSelect,
    MEntitySelect,
    MAttachment,
    MyAttachment
  },
  setup() {
    // 省市区数据
    //const cityData = regions

    //附件上传
    let fileList = reactive([]);
    let fileListMy = reactive([]);
    const attachment = ref(null);
    const attachment1 = ref(null);

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let routeId = route.params.id;

    let awardListApp = inject('awardListApp', reactive({}));

    // const uploadUrl = ref("http://localhost:8081/api/file/upload?token=" + setting.takeToken())

    //搜索学号
    let FetchId = 1;//用于排序
    let FetchTeacherId = 1;//用于排序
    let num = '';//用于传递学号这个参数

    let studentInfo = ({
      displayIndex: '',
      name: '',
      studentId: '',
      major: '',
      grade: '',
    });
    let teacherInfo = ({
      displayIndex: '',
      name: '',
      teacherId: '',
      email: '',
    });
    const state = reactive({
      studentData: [],
      teacherData: [],
      value: [],
      teacherValue: [],
      fetching: false,
    });

    const awardModalApp = reactive({
      id: null,
      award: {awardees: [], instructors: []},
      isEdit: false,
      display: false,
      dialogVisible: false,
    });

    //新增学生
    const students = reactive({
      showValue: false,
      studentInfo: {},
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        studentId: [
          {
            required: true,
            type: 'string',
            message: '请输入学号',
            trigger: 'blur'
          }
        ],
        collegeName: [
          {
            required: true,
            type: 'string',
            message: '请输入队员学院',
            trigger: 'blur'
          }
        ],
        collegeId: [
          {
            required: true,
            type: 'number',
            message: '请输入队员学院',
            trigger: 'blur'
          }
        ],
        major: [
          {
            required: true,
            type: 'string',
            message: '请输入专业',
            trigger: 'blur'
          }
        ],
        grade: [
          {
            required: true,
            type: 'true',
            message: '请输入年级',
            trigger: 'blur'
          }
        ],
        classGrade: [
          {
            required: false,
            type: 'string',
            message: '请输入班级',
            trigger: 'blur'
          }
        ],
        contactTel: [
          {
            required: false,
            type: 'string',
            message: '请输入联系电话',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'string',
            message: '请输入联系邮箱',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '请选择学生类型',
            trigger: 'blur'
          }
        ],
      }
    })
    //定义teacher 、 competitions 、units、 对象用于新增
    const teachers = reactive({
      showValue: false,
      teacherInfo: {},
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入教师姓名',
            trigger: 'blur'
          }
        ],
        teacherId: [
          {
            required: true,
            type: 'string',
            message: '请输入教师工号',
            trigger: 'blur'
          }
        ],
        collegeName: [
          {
            required: true,
            type: 'string',
            message: '请输入学院',
            trigger: 'blur'
          }
        ],
        collegeId: [
          {
            required: true,
            type: 'number',
            message: '请输入学院',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'string',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
      }
    })

    const competitions = reactive({
      showValue: false,
      competition: {},
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入竞赛名称',
            trigger: 'blur'
          }
        ],
        awardLevel: [
          {
            required: true,
            type: 'string',
            message: '请输入获奖级别',
            trigger: 'blur'
          }
        ],
        unitsId: [
          {
            required: true,
            type: 'number',
            message: '请输入主办方',
            trigger: 'blur'
          }
        ],
        unitsName: [
          {
            required: true,
            type: 'string',
            message: '请输入主办方',
            trigger: 'blur'
          }
        ],
        competitionCategory: [
          {
            required: false,
            type: 'string',
            message: '请输入类别',
            trigger: 'blur'
          }
        ],
        competitionLevel: [
          {
            required: false,
            type: 'string',
            message: '请输入级别',
            trigger: 'blur'
          }
        ],
      }
    })
    const units = reactive({
      showValue: false,
      unit: {},
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入举办单位名称',
            trigger: 'blur'
          }
        ]
      }
    })


    //通过学号查询所有相关学生信息
    const fetchStudents = debounce(value => {
      state.studentData = [];
      state.fetching = true;
      AwardService.findStudentInfoNumById(value).then((res) => {
        //后台返回的数据
        //const studentInfo = res.data;
        const data = res.data.map(data => ({
          label: `${data.studentId + ' ' + data.name}`,
          value: `${data.studentId}`,
        }));
        state.studentData = data;
        state.fetching = false;
      }).catch(error => {
        VXETable.modal.message({content: `查找学生出错，原因是：${error.message}`, status: 'error'});
      })
      //fetchStudents函数
    }, 800);

    //通过工号查询所有相关教师信息
    const fetchTeachers = debounce(teacherValue => {
      state.teacherData = [];
      AwardService.findTeacherInfoById(teacherValue).then((res) => {
        //后台返回的数据
        const data = res.data.map(data => ({
          label: `${data.teacherId + ' ' + data.name}`,
          value: `${data.teacherId}`,
        }));
        state.teacherData = data;
      }).catch(error => {
        VXETable.modal.message({content: `查找教师出错，原因是：${error.message}`, status: 'error'});
      })
      //fetchTeachers函数
    }, 800);


    //引入watch后直接在setup里面使用, 调用方式是以回调函数的方式呈现.(可以存在多个)
    //第一个参数是监听的数据对象, 可以是单个变量、数组、函数；第二个参数是数据改变时的回调函数,
    watch(state.value, () => {
      VXETable.modal.message("响应watch函数");
      state.studentData = [];
      state.teacherData = [];
      state.fetching = false;
    });

    //创建一个xGrid对象，并且赋值为空,作为学生表
    const xGrid = ref({});

    const teamFlags = reactive({
      studentIdOfMemberFlag: false,
      teacherIdFlag: false,
      competitionNameFlag: false
    })

    //检验新增队员学号信息是否重复
    const StudentIdOfMemberToBlur = () => {
      if (students.studentInfo.studentId != null) {

        let reg = /^[0-9]{13}$/;
        if (!(reg.test(students.studentInfo.studentId))) {
          teamFlags.studentIdOfMemberFlag = false;
        } else {
          StudentInfoService.getStudentEid(students.studentInfo.studentId.trim()).then((res) => {
            if (res.data != -1) {
              teamFlags.studentIdOfMemberFlag = true;
            } else {
              teamFlags.studentIdOfMemberFlag = false;
              VXETable.modal.message({content: `该队员学号已存在无需添加`, status: 'error'});
            }
          })
            .catch(error => {
              console.log(error);
              VXETable.modal.message({content: `加载数据出错之学号，原因是：${error.message}`, status: 'error'});
            })
        }
      }

    }

    //检验新增老师工号信息是否重复
    const teacherIdIsOnly = () => {
      if (teachers.teacherInfo.teacherId != null) {

        let reg = /^[0-9]{3,16}$/;
        if (!(reg.test(teachers.teacherInfo.teacherId))) {
          teamFlags.teacherIdFlag = false;
        } else {
          TeacherInfoService.getTeacherEid(teachers.teacherInfo.teacherId.trim()).then((res) => {
            if (res.data == true) {
              teamFlags.teacherIdFlag = false;
              VXETable.modal.message({content: `该教师已存在无需添加`, status: 'error'});
            } else {
              teamFlags.teacherIdFlag = true;
            }
          })
            .catch(error => {
              console.log(error);
              VXETable.modal.message({content: `加载数据出错之工号，原因是：${error.message}`, status: 'error'});
            })
        }
      }
    }

    //检验新增竞赛信息是否重复
    const competitionNameIsOnly = () => {
      if (competitions.competition.name != null) {
        CompetitionService.getCompetitionEidByName(competitions.competition.name.trim()).then((res) => {
          if (res.data == true) {
            teamFlags.competitionNameFlag = false;
            VXETable.modal.message({content: `该竞赛可能已经存在`, status: 'error'});
          } else {
            teamFlags.competitionNameFlag = true;
          }
        })
          .catch(error => {
            console.log(error);
            VXETable.modal.message({content: `加载数据出错之竞赛名称，原因是：${error.message}`, status: 'error'});
          })
      }
    }

    //创建一txGrid对象，并且赋值为空，作为教师表
    const txGrid = ref({});

    //向表格中增加一个学生信息
    const addStudent = (value) => {
      if (awardModalApp.award.awardees === undefined) {
        awardModalApp.award.awardees = [];
      }
      num = value;//用于传递学号这个参数
      var iflag = 1;
      const $xGrid = xGrid.value;
      if (num == '') {
        VXETable.modal.message({content: `请输入学生学号查询`});
        return
      }
      AwardService.findStudentInfoById(num).then((res) => {
        studentInfo = res.data;
        //判断对象是否为空
        if (awardModalApp.award.awardees) {
          awardModalApp.award.awardees.forEach(function (value) {
            if (value.studentId === studentInfo[0].studentId) {
              VXETable.modal.message("该学生信息已加入表格当中");
              iflag = 0;
              return;
            }
          })
        }
        //VXETable.modal.message("awardees" + awardModalApp.award.awardees);
        if (iflag) {
          awardModalApp.award.awardees.push({
            "displayIndex": FetchId,
            "studentId": studentInfo[0].studentId,
            // "awardId": studentInfo[0].studentId
          });
          //将学生信息插入表格中
          if (FetchId === 1) {
            $xGrid.insert({
              rowId: FetchId,
              displayIndex: "(队长)",
              name: studentInfo[0].name,
              studentId: studentInfo[0].studentId,
              major: studentInfo[0].major,
              // grade: studentInfo[0].grade,
              // classGrade: studentInfo[0].classGrade,
            })
          } else {
            $xGrid.insert({
              rowId: FetchId,
              displayIndex: "(队员)",
              name: studentInfo[0].name,
              studentId: studentInfo[0].studentId,
              major: studentInfo[0].major,
              // grade: studentInfo[0].grade,
              // classGrade: studentInfo[0].classGrade,
            })
          }
          VXETable.modal.message(studentInfo[0].name + "的信息添加成功，请在下方表格查看");
          FetchId++;
        }
      }).catch(error => {
        VXETable.modal.message({content: `查找学生出错1，原因是：${error.message}`, status: 'error'});
      })
      //awardModalApp.award.awardees.push({studentName:"ddd"});
      //$xGrid.insert(awardModalApp.award.awardees)
    }

    //向表格中增加一个教师信息
    const addTeacher = (teacherValue) => {
      //debugger
      //判断对象是否未定义
      if (awardModalApp.award.instructors === undefined) {
        awardModalApp.award.instructors = [];
      }
      //alert(awardModalApp.award.firstInstructorName)
      //学生首先要添加第一指导教师之后才能够添加其他指导教师
      if (awardModalApp.award.firstInstructorId === '' || awardModalApp.award.firstInstructorId === undefined) {
        VXETable.modal.message({content: `你还未选择第一指导教师，请选择第一指导教师`, status: 'error'});
        return;
      }
      num = teacherValue;//用于传递学号这个参数
      if ((num === undefined) || num == null || num.length == 0) {
        VXETable.modal.message({content: `请输入教师工号查询`});
        return
      }
      const $txGrid = txGrid.value
      //debugger
      AwardService.findTeacherInfoById(num).then((res) => {
        teacherInfo = res.data;
        var iflag = 1;
        //判断对象是否为空
        if (awardModalApp.award.instructors) {
          awardModalApp.award.instructors.forEach(function (value) {
            if (value.teacherId === teacherInfo[0].teacherId) {
              VXETable.modal.message("该教师信息已加入表格当中");
              iflag = 0;
              return;
            }
          })
        }
        //VXETable.modal.message("awardees" + awardModalApp.award.awardees);
        if (iflag) {
          awardModalApp.award.instructors.push({
            "displayIndex": FetchTeacherId,
            "teacherId": teacherInfo[0].teacherId,
            // "awardId": teacherInfo[0].teacherId,
          });
          if (FetchTeacherId == 1) {
            $txGrid.insert({
              displayIndex: "(第一指导教师)",
              name: teacherInfo[0].name,
              teacherId: teacherInfo[0].teacherId,
              email: teacherInfo[0].email,
            })
          } else {
            $txGrid.insert({
              displayIndex: "(指导教师)",
              name: teacherInfo[0].name,
              teacherId: teacherInfo[0].teacherId,
              email: teacherInfo[0].email,
            })
          }
          VXETable.modal.message(teacherInfo[0].name + "的信息添加成功，请在下方表格查看");
          FetchTeacherId++;
        }
      }).catch(error => {
        VXETable.modal.message({content: `查找教师出错，原因是：${error.message}`, status: 'error'});
      })
    }

    //用于远程查询出现的提示语句
    const handleChange = () => {
      VXETable.modal.message(`如果查询为空，记得新增一个学生信息 `);
    };
    const handleBlur = () => {
      //VXETable.modal.message('你以取消查询');
    };
    const handleFocus = () => {
      //VXETable.modal.message('请输入学号/工号查询');
    };

    awardModalApp.rules = {
      firstAwardeeName: [
        {
          required: true,
          type: 'string',
          message: '请输入负责人',
          trigger: 'blur'
        }
      ],
      firstAwardeeId: [
        {
          required: true,
          type: 'number',
          message: '请输入负责人',
          trigger: 'blur'
        }
      ],
      collegeName: [
        {
          required: true,
          type: 'string',
          message: '请输入负责人学院',
          trigger: 'blur'
        }
      ],
      collegeId: [
        {
          required: true,
          type: 'number',
          message: '请输入负责人学院',
          trigger: 'blur'
        }
      ],
      major: [
        {
          required: false,
          type: 'string',
          message: '请输入负责人专业',
          trigger: 'blur'
        }
      ],
      grade: [
        {
          required: false,
          type: 'string',
          message: '请输入负责人年级',
          trigger: 'blur'
        }
      ],
      contactTel: [
        {
          required: false,
          type: 'string',
          message: '请输入负责人联系电话',
          trigger: 'blur'
        }
      ],
      competitionNameName: [
        {
          required: false,
          type: 'string',
          message: '请选择比赛项目名称',
          trigger: 'blur'
        }
      ],
      competitionNameId: [
        {
          required: true,
          type: 'number',
          message: '请选择比赛项目名称',
          trigger: 'blur'
        }
      ],
      workName: [
        {
          required: false,
          type: 'string',
          message: '请输入作品名，参赛队名',
          trigger: 'blur'
        }
      ],
      certificateNo: [
        {
          required: false,
          type: 'string',
          message: '请输入证书编号',
          trigger: 'blur'
        }
      ],
      competitionGroup: [
        {
          required: false,
          type: 'string',
          message: '请输入竞赛组别',
          trigger: 'blur'
        }
      ],
      awardLevel: [
        {
          required: true,
          type: 'string',
          message: '请输入获奖级别',
          trigger: 'blur'
        }
      ],
      awardGrade: [
        {
          required: true,
          type: 'string',
          message: '请输入获奖等级',
          trigger: 'blur'
        }
      ],
      competitionCategory: [
        {
          required: false,
          type: 'string',
          message: '请输入类别',
          trigger: 'blur'
        }
      ],
      competitionLevel: [
        {
          required: false,
          type: 'string',
          message: '请输入举办单位等级',
          trigger: 'blur'
        }
      ],
      organizationId: [
        {
          required: true,
          type: 'number',
          message: '请输入举办单位',
          trigger: 'blur'
        }
      ],
      organizationName: [
        {
          required: true,
          type: 'string',
          message: '请输入举办单位',
          trigger: 'blur'
        }
      ],
      awardDate: [
        {
          required: true,
          type: 'string',
          message: '请输入获奖日期',
          trigger: 'blur'
        }
      ],
      firstInstructorName: [
        {
          required: true,
          type: 'string',
          message: '请输入第一指导教师',
          trigger: 'blur'
        }
      ],
      firstInstructorId: [
        {
          required: true,
          type: 'number',
          message: '请输入第一指导教师',
          trigger: 'blur'
        }
      ],
      evidence: [
        {
          required: false,
          type: 'string',
          message: '请输入证明文件',
          trigger: 'blur'
        }
      ],
      allStudents: [
        {
          required: false,
          type: 'string',
          message: '请输入所有获奖学生',
          trigger: 'blur'
        }
      ],
      auditStatus: [
        {
          required: false,
          type: 'string',
          message: '请输入审核状态',
          trigger: 'blur'
        }
      ],
      reviewerId: [
        {
          required: false,
          type: 'number',
          message: '请输入审核人',
          trigger: 'blur'
        }
      ],
      reviewerName: [
        {
          required: false,
          type: 'string',
          message: '请输入审核人',
          trigger: 'blur'
        }
      ],
    }


    const insertEvent = () => {
      const $xGrid = xGrid.value
      const record = studentInfo
      $xGrid.insert(record)

    }

    const deleteEvent = (row) => {
      const $xGrid = xGrid.value
      //将一个Proxy对象通过vue中的响应式对象toRaw()方法来获取原始对象
      var list = toRaw(row)
      //console.log(list.studentId)
      //通过学号去除学生信息
      if (list.displayIndex === "(队长)") {//队长信息不能移除
        //alert("队长的信息不能被移除")
        VXETable.modal.message({content: `队长的信息不能被移除`, status: 'error'});
        return;
      }
      if (list.studentId) {
        removeStudent(list.studentId);
      }
      $xGrid.remove(row)
    }

    const removeStudent = (studentId) => {
      awardModalApp.award.awardees.forEach(function (value, index) {
        //获取原始对象
        let v = toRaw(value)
        let i = index;
        if (v.studentId == studentId) {
          for (; i < awardModalApp.award.awardees.length - 1; i++) {
            awardModalApp.award.awardees[i] = awardModalApp.award.awardees[i + 1];
          }
          awardModalApp.award.awardees[i] = [];
          delete awardModalApp.award.awardees[i];
          awardModalApp.award.awardees.length--;
          return;
        }
      })
    }

    const deleteEventTeacher = (row) => {
      debugger
      const $txGrid = txGrid.value
      var list = toRaw(row)
      //console.log(list.teacherId)
      if (list.teacherId) {
        removeTeacher(list.teacherId);
      }
      //debugger
      if (list.displayIndex == "第一指导教师") {
        awardModalApp.award.firstInstructorId = '';
      }
      $txGrid.remove(row)
    }

    //从表格中移除教师信息
    const removeTeacher = (teacherId) => {
      awardModalApp.award.instructors.forEach(function (value, index) {
        //获取原始对象
        let v = toRaw(value)
        let i = index;
        if (v.teacherId == teacherId) {
          for (; i < awardModalApp.award.instructors.length - 1; i++) {
            awardModalApp.award.instructors[i] = awardModalApp.award.instructors[i + 1];
          }
          awardModalApp.award.instructors[i] = [];
          delete awardModalApp.award.instructors[i];
          awardModalApp.award.instructors.length--;
          return;
        }
      })
    }

    //所以获奖学生表
    const gridOptions = reactive({
      border: true,
      resizable: true,
      showHeaderOverflow: true,
      showOverflow: true,
      highlightHoverRow: true,
      isCurrent: true,
      keepSource: true,
      stripe: true,
      id: 'awardeesGrid',
      // maxHeight: "100%",//表格高度
      rowId: 'eid',
      selectRow: null,
      showEdit: false,
      showDetails: false,
      showEditTitle: '新建',
      showDetailsTitle: '查看',
      // formData: 'studentInfo',//自定义的
      // detailData: studentInfo,
      // //data: awardModalApp.award.awardees,
      // data: 'studentInfo',

      /*TODO:排序配置 */
      sortConfig: {
        trigger: 'cell',
        remote: true,
        multiple: true,//多字段排序，默认单排序
        showIcon: true,
        // iconAsc: "fa fa-arrow-up fa-1x",
        // iconDesc: "fa fa-arrow-down fa-1x",
      },
      customConfig: {
        storage: true
      },

      /*TODO:数据表列*/
      //数据项列表
      columns: [
        {
          field: 'displayIndex',
          title: '序号',
          sortable: true
        },
        {
          field: 'name',
          title: '姓名',
          sortable: true
        },
        {
          field: 'studentId',
          title: '学号',
          sortable: true
        },
        {
          field: 'major',
          title: '专业',
          sortable: true
        },
        // {
        //   field: 'grade',
        //   title: '年级',
        //   sortable: true
        // },
        // {
        //   field: 'classGrade',
        //   title: '班级',
        //   sortable: true
        // },
        {title: '操作', width: 200, slots: {default: 'operate'}}
      ],

      /*TODO:复选框配置*/
      checkboxConfig: {
        labelField: 'eid',
        reserve: false,
        highlight: false,
        range: true
      },
      editConfig: {
        trigger: 'click',
        mode: 'row',
        showStatus: true
      }
    })//as VxeGridProps

    //所有指导教师表
    const gridOptionsTeacher = reactive({
      border: true,
      resizable: true,
      showHeaderOverflow: true,
      showOverflow: true,
      highlightHoverRow: true,
      keepSource: true,
      isCurrent: true,
      stripe: true,
      id: 'awardeesGrid',
      // maxHeight: "100%",//表格高度
      rowId: 'eid',
      selectRow: null,
      showEdit: false,
      showDetails: false,
      showEditTitle: '新建',
      showDetailsTitle: '查看',
      data: teacherInfo,

      /*TODO:排序配置 */
      sortConfig: {
        trigger: 'cell',
        remote: true,
        multiple: true,//多字段排序，默认单排序
        showIcon: true,
        // iconAsc: "fa fa-arrow-up fa-1x",
        // iconDesc: "fa fa-arrow-down fa-1x",
      },
      customConfig: {
        storage: true
      },

      /*TODO:数据表列*/
      //数据项列表
      columns: [
        {
          field: 'displayIndex',
          title: '序号',
          sortable: true
        },
        {
          field: 'name',
          title: '教师姓名',
          sortable: true
        },
        {
          field: 'teacherId',
          title: '工号',
          sortable: true
        },
        {
          field: 'email',
          title: '邮箱',
          sortable: true
        },
        {title: '操作', width: 200, slots: {default: 'operate'}}
      ],

      /*TODO:复选框配置*/
      checkboxConfig: {
        labelField: 'eid',
        reserve: false,
        highlight: false,
        range: true
      },
      editConfig: {
        trigger: 'click',
        mode: 'row',
        showStatus: true
      }
    })//as VxeGridProps

    const onSubmitStudentInfo = async (data) => {
      const type = await VXETable.modal.confirm('您确定要保存吗？')
      if (type == "confirm") {
        let reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // alert(data.remark)
        // alert(data.remark!=undefined)
        if (data.remark != undefined && students.studentInfo.grade != undefined && data.name != undefined && teamFlags.studentIdOfMemberFlag != false && data.collegeId != undefined && data.major != undefined && reg.test(data.email)) {
          AwardService.saveStudentInfo(data).then(() => {
            VXETable.modal.message({content: `${data.name}学生信息添加成功`});
            students.studentInfo = {};
            // console.log(res)
            students.showValue = false;
            addStudent(data.studentId)  //确定之后表格直接添加
          }).catch(error => {
            VXETable.modal.message({content: `新增出错，原因是：${error.message}`, status: 'error'});
          })
        } else {
          VXETable.modal.message({content: `请填写完整且正确的信息`, status: 'error'});
        }

      } else {
        students.studentInfo = {};
        await VXETable.modal.message({content: `取消了新增操作`})
      }

    }

    const onSubmitCompetition = async (data) => {
      const type = await VXETable.modal.confirm('您确定要保存吗？')
      if (type == "confirm") {
        if (teamFlags.competitionNameFlag == true && data.name != undefined && data.unitsId != undefined) {
          AwardService.saveCompetition(data).then((res) => {
            VXETable.modal.message({content: `${data.name}竞赛信息添加成功`});
            competitions.competition = {};
            console.log(res)
            competitions.showValue = false;
          }).catch(error => {
            VXETable.modal.message({content: `新增出错，原因是：${error.message}`, status: 'error'});
          })
        } else {
          VXETable.modal.message({content: `请填写完整且正确的信息`, status: 'error'});
        }
      } else {
        competitions.competition = {};
        await VXETable.modal.message({content: `取消了新增操作`})
      }

    }

    const onSubmitUnit = async (data) => {
      const type = await VXETable.modal.confirm('您确定要保存吗？')
      if (type == "confirm") {
        if (data.name === undefined || data.name === ' ') {
          VXETable.modal.message({content: `请填写举办单位名称！`, status: 'error'});
        } else {
          AwardService.getUnitName(data.name).then((res) => {
            if (res.data) {
              VXETable.modal.message({content: `该举办单位已存在`, status: 'error'});
            } else {
              AwardService.saveUnit(data).then(() => {
                VXETable.modal.message({content: `${data.name}单位信息添加成功`});
                units.unit = {};
                // console.log(res)
                units.showValue = false;
              }).catch(error => {
                VXETable.modal.message({content: `新增出错，原因是：${error.message}`, status: 'error'});
              })
            }
          }).catch(error => {
            VXETable.modal.message({content: `举办单位检验出错，原因是：${error.message}`, status: 'error'});
          })
        }
      } else {
        await VXETable.modal.message({content: `取消了新增操作`})
      }
    }

    const onSubmitTeacherInfo = async (data) => {
      const type = await VXETable.modal.confirm('您确定要保存吗？')
      if (type == "confirm") {
        let reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (teamFlags.teacherIdFlag == true && data.name != undefined && data.teacherId != undefined && data.email != undefined && reg.test(data.email) && data.collegeId != undefined) {
          AwardService.saveTeacherInfo(data).then((res) => {
            VXETable.modal.message({content: `${data.name}教师信息添加成功`});
            teachers.teacherInfo = {};
            console.log(res)
            teachers.showValue = false;
            addTeacher(data.teacherId) //新增指导老师后直接在表格中显示
          }).catch(error => {
            VXETable.modal.message({content: `新增出错，原因是：${error.message}`, status: 'error'});
          })
        } else {
          VXETable.modal.message({content: `请填写完整且正确的信息`, status: 'error'});
        }
      } else {
        teachers.teacherInfo = {};
        await VXETable.modal.message({content: `取消了新增操作`})
      }

    }


    const confirmEvent = async (data) => {
      const type = await VXETable.modal.confirm('您确定要保存吗？')
      if (type == "confirm") {

        if (data.teacherId) {
          onSubmitTeacherInfo(data);
          teachers.showValue = false;
        }
        if (data.unitsId) {
          onSubmitCompetition(data);
          competitions.showValue = false;
        }

        let reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (students.studentInfo.remark != undefined && students.studentInfo.grade != undefined && students.studentInfo.name != undefined && teamFlags.studentIdOfMemberFlag != false && students.studentInfo.collegeId != undefined && students.studentInfo.major != undefined && reg.test(students.studentInfo.email)) {
          onSubmitStudentInfo(data);
          students.showValue = false;
        } else {
          VXETable.modal.message({content: `请填写完整且正确的信息`, status: 'error'});
        }

        if (!data.studentId && !data.unitsId && !data.teacherId) {
          onSubmitUnit(data);
          units.showValue = false;
        }
      } else {
        await VXETable.modal.message({content: `取消了新增操作`})
      }

    }

    onMounted(() => {
      //清理数据
      awardModalApp.award = reactive({});
      if (routeId) {//路由
        awardModalApp.id = routeId;
        awardModalApp.display = false;
        findAward(awardModalApp.id);
      } else if (awardListApp.editModalForEdit) {//修改弹窗
        awardModalApp.display = true;
        awardModalApp.id = awardListApp.currentId;
        //用 awardModalApp.id 来判断是修改还是新增
        if (awardModalApp.id) {
          //查询出所有获奖学生和指导的信息
          find_studentsById(awardModalApp.id);
          find_instructorsById(awardModalApp.id);
        } else {
          gridOptions.showEditTitle = ""
          getUser();
        }
      } else if (!awardListApp.editModalForEdit && awardListApp.addModalForEdit) {//新增弹窗
        getUser();
        awardModalApp.display = true;
      } else {
        awardModalApp.title = "新增获奖信息";
        awardListApp.addModalForEdit.width = "100%";
      }
      if (awardModalApp.id) findAward(awardModalApp.id);
    })

    // onUpdated(()=>{
    //   alert("qqq");
    // })

    const findAward = (id) => {
      AwardService.findAwardForView(id).then((res) => {
        awardModalApp.award = res.data;
        //TODO:为编辑准备.
        awardModalApp.title = "正在修改" + awardModalApp.award.firstAwardeeName + "的获奖信息";
      }).catch(error => {
        VXETable.modal.message({content: `查找获奖信息出错，原因是：${error.message}`, status: 'error'});
      })
    }
    /*TODO:提交 新增&编辑*/
    const onSubmit = async (data) => {

      //当为数组时用逗号连接
      if (data.eid) {
        //修改

        if (data.competitionNameName == null) {
          //alert("请选择竞赛项目名称");
          VXETable.modal.message({content: `请选择竞赛项目名称!`, status: 'error'})
          return;
        }
        if (data.awardDate == null) {
          //alert("请输入获奖日期");
          VXETable.modal.message({content: `请输入获奖日期!`, status: 'error'})
          return;
        }
        if (data.awardGrade == null) {
          //alert("请输入获奖等级");
          VXETable.modal.message({content: `请输入获奖等级!`, status: 'error'})
          return;
        }
        if (data.awardLevel == null) {
          //alert("请输入获奖级别");
          VXETable.modal.message({content: `请输入获奖级别!`, status: 'error'})
          return;
        }

        const type = await VXETable.modal.confirm('您确定要提交吗，不再检查一下？')

        if (type == "confirm") {
          data.reviewerId = '';
          AwardService.updateAward(data).then(() => {
            // console.log(res);
            saveFile(data.eid)
            saveFileMy(data.eid)

            VXETable.modal.message({content: '修改获奖信息操作成功', status: 'success'});
            setTimeout(onBack, 1000);
          }).catch(error => {
            VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
          })
        } else {
          VXETable.modal.message("你已取消提交!");
          return;
        }

      } else {
        //新增
        //数据变成JSON类型
        //var Jdata = JSON.stringify(data);
        if (data.competitionNameName == null) {
          //alert("请选择竞赛项目名称");
          VXETable.modal.message({content: `请选择竞赛项目名称!`, status: 'error'})
          return;
        }
        if (data.awardDate == null) {
          //alert("请输入获奖日期");
          VXETable.modal.message({content: `请输入获奖日期!`, status: 'error'})
          return;
        }
        if (data.awardGrade == null) {
          //alert("请输入获奖等级");
          VXETable.modal.message({content: `请输入获奖等级!`, status: 'error'})
          return;
        }
        if (data.awardLevel == null) {
          //alert("请输入获奖级别");
          VXETable.modal.message({content: `请输入获奖级别!`, status: 'error'})
          return;
        }

        const type = await VXETable.modal.confirm('您确定要提交吗，不再检查一下？')

        if (type == "confirm") {

          AwardService.saveAward(data).then((res) => {
            // console.log(res);
            saveFile(res.data.eid)
            saveFileMy(res.data.eid)
            VXETable.modal.message({content: '新增获奖信息操作成功,等待管理员审核吧！', status: 'success'});
            setTimeout(onBack, 1000);
          }).catch(error => {
            VXETable.modal.message({content: `系统错误，原因是：${error.message}`, status: 'error'});
          })
        } else {
          VXETable.modal.message("你已取消提交!");
          return;
        }
      }
    }
    /*TODO:继续提交*/
    const continueSubmit = () => {
      VXETable.modal.message({content: 'error 提示', status: 'error'});
    }
    /*TODO:返回列表*/
    const onBack = () => {
      router.push(`/ams/awardEntity/award`);
      awardListApp.editModalShowing = false;
      awardListApp.tableRefresh();
      store.dispatch('user/tabRemove', route.fullPath);
    }
    //联动选择框（学生信息）
    const findStudentInfo = (studentInfoId) => {
      AwardService.findStudentInfoById(studentInfoId).then((res) => {
        res.data = res.data[0];
        awardModalApp.award.firstAwardeeName = res.data.name;
        awardModalApp.award.firstAwardeeId = res.data.eid;
        awardModalApp.award.collegeName = res.data.collegeName;
        awardModalApp.award.collegeId = res.data.collegeId;
        AwardService.findCollegeForView(awardModalApp.award.collegeId).then((res1) => {
          awardModalApp.award.collegeName = res1.data.name;
        })

        awardModalApp.award.major = res.data.major;
        awardModalApp.award.grade = res.data.grade;
        awardModalApp.award.contactTel = res.data.contactTel;
        studentInfo = [];
        //addStudent(res.data.studentId);
        awardModalApp.award.auditStatus = "未审核";
      })
    }
    //联动选择框（竞赛信息）
    const findCompetitionInfo = (competitionName) => {
      AwardService.findCompetitionInfoByName(competitionName).then((res) => {
        awardModalApp.award.competitionNameName = res.data.name;
        awardModalApp.award.competitionLevel = res.data.competitionLevel;
        awardModalApp.award.competitionCategory = res.data.competitionCategory;
        awardModalApp.award.organizationName = res.data.unitsId;
        awardModalApp.award.organizationId = res.data.unitsId;
      })
    }
    //联动选择框（将指导教师信息加入表格）
    const addTeacherToForm = async (teacherInfoId) => {

      //const type = await VXETable.modal.confirm('您确定选择当前教师为第一指导教师吗');
      /*if (true) {
        AwardService.findTeacherInfo(teacherInfoId).then((res) => {
          addFirstInstructor(res.data.teacherId);
        })
      } else {
        VXETable.modal.message("您已取消选择");
        return;
      }*/
      AwardService.findTeacherInfo(teacherInfoId).then((res) => {
        addFirstInstructor(res.data.teacherId);
      })
    }

    const addFirstInstructor = (teacherId) => {
      debugger
      //判断对象是否未定义
      const $txGrid = txGrid.value
      if (awardModalApp.award.instructors === undefined) {
        awardModalApp.award.instructors = [];
      }
      // if (awardModalApp.award.instructors.length > 1) {  //去除以前选择的第一指导老师
      //   removeTeacher(awardModalApp.award.firstInstructorId);
      //   $txGrid.remove('row_78');
      // }
      AwardService.findTeacherInfoById(teacherId).then((res) => {
        teacherInfo = res.data;
        var iflag = 1;
        //判断对象是否为空
        if (awardModalApp.award.instructors) {
          awardModalApp.award.instructors.forEach(function (value) {
            if (value.teacherId === teacherInfo[0].teacherId) {
              VXETable.modal.message("该教师信息已加入表格当中");
              iflag = 0;
              return;
            }
          })
        }
        //VXETable.modal.message("awardees" + awardModalApp.award.awardees);
        if (iflag) {
          awardModalApp.award.instructors.push({
            "displayIndex": 1,
            "teacherId": teacherInfo[0].teacherId,
            // "awardId": teacherInfo[0].teacherId,
          });
          //赋值为第一个
          //awardModalApp.award.instructors[0] = teacherInfo[0];
          $txGrid.insert({
            displayIndex: "(第一指导教师)",
            name: teacherInfo[0].name,
            teacherId: teacherInfo[0].teacherId,
            email: teacherInfo[0].email,
          })
          VXETable.modal.message(teacherInfo[0].name + "的信息添加成功，请在下方表格查看");
          if (FetchTeacherId == 1) {
            FetchTeacherId++;
          }
        }
      }).catch(error => {
        VXETable.modal.message({content: `查找教师出错，原因是：${error.message}`, status: 'error'});
      })
    }

    // /* 获取当前用户信息 */
    const getUser = () => {
      return new Promise((resolve, reject) => {
        axios.get(setting.userUrl).then((res) => {
          //获取当前用户信息
          const result = setting.parseUser ? setting.parseUser(res.data) : res.data;
          //const result = res.data.nickname;
          if (result.code === 0) {
            const username = result.data.nickname;

            // setting.cacheDicts(user.dicts);
            // setting.cacheConfigs(user.configs);
            // setting.cacheUser(user);
            findStudentInfo(username);
            addStudent(username);

          } else if (result.msg) {
            this.$message.error(result.msg);
            return reject(new Error(result.msg));
          }
        }).catch((e) => {
          console.error(e);
          this.$message.error(e.message);
          return reject(new Error(e.message));
        })
      })
    }

    // /* 获取当前用户信息 */
    const getUser_adit = (id) => {
      axios.get(setting.userUrl).then((res) => {
        //获取当前用户信息
        const result = setting.parseUser ? setting.parseUser(res.data) : res.data;
        //const result = res.data.nickname;
        if (result.code === 0) {
          findStudentInfo(id);
        }
      })
    }

    const find_studentsById = (id) => {
      AwardService.findAwardeeByAwardId(id).then((res) => {
        let data = [];
        data = res.data;
        awardModalApp.award.awardees = [];

        for (var i = 0; i < data.length; i++) {
          //alert(data[i].studentId+"1");
          const $xGrid = xGrid.value;
          const id = data[i].studentId;
          if (data[i].displayIndex == 1) {
            getUser_adit(id);
          }
          //将学生信息加入表格
          AwardService.findStudentInfoById(id).then((res) => {
            studentInfo = res.data[0];
            var iflag = 1;
            //判断对象是否为空
            if (awardModalApp.award.awardees) {
              awardModalApp.award.awardees.forEach(function (value) {
                if (value.studentId === studentInfo.studentId) {
                  //VXETable.modal.message("该学生信息已加入表格当中");
                  iflag = 0;
                  return;
                }
              })
            }
            //VXETable.modal.message("awardees" + awardModalApp.award.awardees);
            if (iflag) {
              awardModalApp.award.awardees.push({
                "displayIndex": FetchId,
                "studentId": studentInfo.studentId,
                // "awardId": studentInfo.studentId
              });
              //将学生信息插入表格中
              if (FetchId === 1) {
                $xGrid.insert({
                  rowId: FetchId,
                  displayIndex: "(队长)",
                  name: studentInfo.name,
                  studentId: studentInfo.studentId,
                  major: studentInfo.major,
                  // grade: studentInfo[0].grade,
                  // classGrade: studentInfo[0].classGrade,
                })
              } else {
                $xGrid.insert({
                  rowId: FetchId,
                  displayIndex: "(队员)",
                  name: studentInfo.name,
                  studentId: studentInfo.studentId,
                  major: studentInfo.major,
                  // grade: studentInfo[0].grade,
                  // classGrade: studentInfo[0].classGrade,
                })
              }
              if (!awardListApp.currentId) {
                VXETable.modal.message(studentInfo.name + "的信息添加成功，请在下方表格查看");
              }
              FetchId++;
            }
          }).catch(() => {
            this.$message.error(studentInfo.name + "添加失败");
          })
        }
      });
    }

    const find_instructorsById = (id) => {
      AwardService.findInstructorByAwardId(id).then((res) => {
        let data = [];
        data = res.data;
        awardModalApp.award.instructors = [];
        for (var i = 0; i < data.length; i++) {
          const $txGrid = txGrid.value;
          const id = data[i].teacherId;
          //将指导教师加入表格
          AwardService.findTeacherInfoById(id).then((res) => {
            teacherInfo = res.data[0];
            var iflag = 1;
            //判断对象是否为空
            if (awardModalApp.award.instructors) {
              awardModalApp.award.instructors.forEach(function (value) {
                if (value.teacherId === teacherInfo.teacherId) {
                  //VXETable.modal.message(teacherInfo.name + "教师信息已加入下方表格当中");
                  iflag = 0;
                  return;
                }
              })
            }
            //VXETable.modal.message("awardees" + awardModalApp.award.awardees);
            if (iflag) {
              awardModalApp.award.instructors.push({
                "displayIndex": FetchTeacherId,
                "teacherId": teacherInfo.teacherId,
                // "awardId": teacherInfo.teacherId,
              });
              if(FetchTeacherId == 1){
                $txGrid.insert({
                  displayIndex: "第一指导教师",
                  name: teacherInfo.name,
                  teacherId: teacherInfo.teacherId,
                  email: teacherInfo.email,
                })
              }else{
                $txGrid.insert({
                  displayIndex:"指导教师",
                  name: teacherInfo.name,
                  teacherId: teacherInfo.teacherId,
                  email: teacherInfo.email,
                })
              }
              FetchTeacherId++;
            }
          }).catch(error => {
            VXETable.modal.message({content: `查找教师出错1，原因是：${error.message}`, status: 'error'});
          })
        }

      }).catch(() => {
        this.error(teacherInfo.name + "添加失败");
      })
    }

    const closeEdit = () => {
      //alert("关闭");
      // alert("edit"+awardListApp.editModalForEdit);
      // alert("add"+awardListApp.addModalForEdit);
    }

    const look = () => {
      //window.location.href=awardModalApp.phone_tip_url;
      window.open(awardModalApp.phone_tip_url);
    }


    //附件上传
    //获取子组件传过来的fileList
    let fileListFromParent = (files) => {
      // childValue就是子组件传过来的值
      fileList.values = files;
    }
    let fileListFromParentMy = (files) => {
      // childValue就是子组件传过来的值
      fileListMy.values = files;
    }

    let operatorType = ref();
    //点击上传
    const saveFile = (entityEid) => {
      if (fileList.values.length !== 0) {
        let formData = new FormData();
        //表单名--对应实体表名
        let formDto = {associateFormId: entityEid, associateFormName: "award"};
        var fileUploadDto = JSON.stringify(formDto)
        formData.append("fileUploadDto", new Blob([fileUploadDto], {type: "application/json"}));
        fileList.values.forEach(file => {
          formData.append('files', file)
        });
        uploadAttachmentService.saveFile(formData).then(() => {
          fileList = [];
          VXETable.modal.message({content: '奖状上传成功', status: 'success'});
          //更改上传组件的状态为编辑状态
          operatorType = "edit";
          cleanFileList();
        }).catch((error) => {
          VXETable.modal.message({content: '奖状上传失败' + `系统错误，原因是：${error.message}`, status: 'error'});
        });

      }
      // else {
      //   VXETable.modal.message({content: '请选择文件', status: 'warning'});
      // }
    }


    //点击上传
    const saveFileMy = (entityEid) => {

      if (fileListMy.values.length !== 0) {
        let formData = new FormData();
        //表单名--对应实体表名
        let formDto = {associateFormId: entityEid, associateFormName: "award"};
        var fileUploadDto = JSON.stringify(formDto)
        formData.append("fileUploadDto", new Blob([fileUploadDto], {type: "application/json"}));
        fileListMy.values.forEach(file => {
          formData.append('files', file)
        });
        uploadAttachmentService.saveFileMy(formData).then(() => {

          fileListMy = [];
          VXETable.modal.message({content: '资源包上传成功', status: 'success'});
          //更改上传组件的状态为编辑状态
          operatorType = "edit";
          cleanFileListMy();
        }).catch((error) => {
          VXETable.modal.message({content: '资源包上传失败' + `系统错误，原因是：${error.message}`, status: 'error'});
        });

      }
    }

    //清空子父组件fileList并刷新子组件reFileList
    let cleanFileList = () => {
      fileList.value = [];
      attachment.value.cleanFileList();
      attachment.value.findFile(awardModalApp.award.eid, "award");
    }
    let cleanFileListMy = () => {
      fileListMy.value = [];
      attachment1.value.cleanFileList();
      attachment1.value.findFile(awardModalApp.award.eid, "award");
    }

    //模板下载
    const downloadMould = () => {
      AwardService.down("zhang99999").then((res) => {
        FileSaver.saveAs(
          new Blob([res.data], {type: "application/x-tar"}),
          "竞赛名称+市级二等+队长姓名.zip"
        )
      })
    }

    return {
      routeId,
      awardListApp,
      awardModalApp,
      onSubmit,
      continueSubmit,
      onBack,
      insertEvent,
      deleteEvent,
      deleteEventTeacher,
      gridOptions,
      gridOptionsTeacher,
      xGrid,
      txGrid,
      handleBlur,
      handleFocus,
      handleChange,
      ...toRefs(state),
      fetchStudents,
      fetchTeachers,
      addStudent,
      addTeacher,
      findCompetitionInfo,
      findStudentInfo,
      addTeacherToForm,
      removeStudent,
      removeTeacher,
      getUser,
      onSubmitStudentInfo,
      onSubmitTeacherInfo,
      students,
      teachers,
      competitions,
      units,
      onSubmitCompetition,
      onSubmitUnit,
      confirmEvent,
      find_studentsById,
      getUser_adit,
      closeEdit,
      find_instructorsById,
      look,
      fileListFromParent,
      attachment,
      attachment1,
      saveFileMy,
      operatorType,
      saveFile,
      downloadMould,
      fileListFromParentMy,
      StudentIdOfMemberToBlur,
      teamFlags,
      teacherIdIsOnly,
      competitionNameIsOnly
    }
  },
})
</script>

<style scoped>
.ele-body {
  margin: auto;
}

a-p {
  font-size: 15px;
  font-weight: 500;
}

.addButton {
  margin-left: 10px;
}

.select {
  border: white;
}

.tip {
  color: #2086c9;
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 25px;
}

.tips {
  color: #2086c9;
  font-size: 24px;
  font-weight: 500;
  margin-left: 20px;
  padding-bottom: 25px;
  margin-top: 20px;
}

.gerenxinxiDIV {
  position: relative;
  width: 1175px;
  padding-left: 22px;
  /*padding-bottom: 20px;*/
  border-style: none none none none;
  border-color: #2086c9;
  border-width: 4px;
  margin: auto;
}

.jingsaixinxiDIV {
  position: relative;
  width: 1175px;
  padding-left: -35px;
  padding-right: 60px;
  /*padding-bottom: 20px;*/
  border-style: none none none none;
  border-color: #2086c9;
  border-width: 4px;
  margin: auto;
}

.huojiangxueshengDIV {
  position: relative;
  width: 1175px;
  /*padding-bottom: 20px;*/
  border-style: none none none none;
  border-color: #2086c9;
  border-width: 4px;
  margin: auto;
}

.zhidaolaoshiDIV {
  position: relative;
  width: 1175px;
  /*padding-bottom: 20px;*/
  border-style: none none none none;
  border-color: #2086c9;
  border-width: 4px;
  margin: auto;
}

.zhengmingcailiaoDIV {
  position: relative;
  width: 1175px;
  height: 200px;
  margin: auto;
}

.addAwardTips {
  text-align: right;
  padding-left: 80px;
  margin-top: 7px;
  font-size: 15px;
  font-weight: 550;
}

.addtips {
  font-size: 15px;
  font-weight: 550;
  margin-left: 87px;
  margin-top: 2px;
}

.addStudentTips {
  font-size: 15px;
  font-weight: 550;
  margin-top: 4px;
  margin-left: 30px;
}

.addTeacherTips {
  font-size: 15px;
  font-weight: 550;
  margin-top: 2px;
  margin-left: 40px;
}

.addStudentButton {
  margin-bottom: 18px;
}

.studentsList {
  margin: 30px 60px 35px 85px;
  width: 900px;
}

.tableName {
  color: red;
  font-size: 10px;
  font-weight: 500;
  align-items: center;
}

.theTip {
  font-size: 14px;
}
</style>
