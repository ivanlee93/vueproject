<style lang="stylus" scoped>
.dialogp1 {
    width: 20%;
    display: inline-block;
    padding: 15px;

    span {
        color: red;
    }

    .el-input {
        width: calc(100% - 60px);
    }

    .el-select {
        width: calc(100% - 60px);
    }
}

.dialogp2 {
    width: 20%;
    display: inline-block;
    padding: 15px;

    span {
        color: red;
    }

    .el-input {
        width: calc(100% - 60px);
    }

    .el-select {
        width: calc(100% - 60px);
    }
}

.dialogp3 {
    width: 23%;
    display: inline-block;
    padding: 15px;

    span {
        color: red;
    }

    .el-input {
        width: calc(100% - 90px);
    }
    .el-select {
        width: calc(100% - 90px);
    }
}

.dialogp4 {
    width: 23%;
    display: inline-block;
    padding: 15px;

    span {
        color: red;
    }

    .el-input {
        width: calc(100% - 90px);
    }
}

.dialogp5 {
    width: 24%;
    display: inline-block;
    padding: 15px 0px 15px 6px;

    span {
        color: red;
    }

    .el-input {
        width: calc(100% - 100px);
    }
}

.dialogp6 {
    width: 30%;
    display: inline-block;
    padding: 15px 10px 15px 10px;

    span {
        color: red;
    }

    .el-input {
        width: calc(100% - 113px);
    }
}

.radionomar {
    margin-left: 10px;
}
</style>

<template>
    <el-dialog :title="userdialog.dialogTitle" :visible.sync="userdialog.dialogFormVisible" width="1000px">
        <div class="dialogbody">
            <p class="dialogp1">
                <span>*</span>
                姓名：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.name">
                    <i class="el-icon-edit el-input__icon" slot="suffix">
                    </i>
                </el-input>
            </p>
            <p class="dialogp2">
                <span>*</span>
                性别：
                <el-radio v-model.trim="userdialog.info.sex" label="男">男</el-radio>
                <el-radio class="radionomar" v-model.trim="userdialog.info.sex" label="女">女</el-radio>
            </p>
            <p class="dialogp3">
                <span>*</span>
                出生日期：
                <el-date-picker v-model="userdialog.info.birthdate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp">
                </el-date-picker>
            </p>
            <p class="dialogp4">
                <span>*</span>
                政治面貌：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.political"></el-input>
            </p>
            <p class="dialogp1">
                <span>*</span>
                民族：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.nation"></el-input>
            </p>
            <p class="dialogp2">
                <span>*</span>
                籍贯：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.nativeplace"></el-input>
            </p>
            <p class="dialogp3">
                <span>*</span>
                电子邮箱：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.email">
                    <i class="el-icon-message el-input__icon" slot="suffix">
                    </i>
                </el-input>
            </p>
            <p class="dialogp4">
                <span>*</span>
                联系地址：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.provicen"></el-input>
            </p>
            <p class="dialogp1">
                <span>*</span>
                职位：
                <el-select v-model.trim="userdialog.info.position" placeholder="请选择">
                    <el-option v-for="item in position" :key="item._id" :label="item.position" :value="item.position">
                    </el-option>
                </el-select>
            </p>
            <p class="dialogp2">
                <span>*</span>
                职称：
                <el-select v-model.trim="userdialog.info.competent" placeholder="请选择">
                    <el-option v-for="item in competent" :key="item._id" :label="item.competent" :value="item.competent">
                    </el-option>
                </el-select>
            </p>
            <p class="dialogp3">
                <span>*</span>
                所属部门：
                <el-select v-model.trim="userdialog.info.department" placeholder="请选择">
                    <el-option v-for="item in department" :key="item._id" :label="item.department" :value="item.department">
                    </el-option>
                </el-select>
            </p>
            <p class="dialogp4">
                <span>*</span>
                电话号码：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.mobile">
                    <i class="el-icon-phone el-input__icon" slot="suffix">
                    </i>
                </el-input>
            </p>
            <p class="dialogp1">
                <span>*</span>
                工号：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.jobid" :disabled="userdialog.dialogTitle!='新增员工资料'"></el-input>
            </p>
            <p class="dialogp2">
                <span>*</span>
                学历：
                <el-select v-model.trim="userdialog.info.education" placeholder="请选择">
                    <el-option v-for="item in educations" :key="item.label" :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </p>
            <p class="dialogp3">
                <span>*</span>
                毕业院校：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.school">
                    <i class="el-icon-edit el-input__icon" slot="suffix">
                    </i>
                </el-input>
            </p>
            <p class="dialogp4">
                <span>*</span>
                专业名称：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.major">
                    <i class="el-icon-edit el-input__icon" slot="suffix">
                    </i>
                </el-input>
            </p>
            <p class="dialogp5">
                <span>*</span>
                入职日期：
                <el-date-picker v-model.trim="userdialog.info.entry" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp">
                </el-date-picker>
            </p>
            <p class="dialogp5">
                <span>*</span>
                转正日期：
                <el-date-picker v-model.trim="userdialog.info.become" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp">
                </el-date-picker>
            </p>
            <p class="dialogp5">
                <span>*</span>
                合同起始：
                <el-date-picker v-model.trim="userdialog.info.contractstart" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp">
                </el-date-picker>
            </p>
            <p class="dialogp5">
                <span>*</span>
                合同终止：
                <el-date-picker v-model.trim="userdialog.info.contractend" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp">
                </el-date-picker>
            </p>
            <p class="dialogp6">
                <span>*</span>
                身份证号码：
                <el-input placeholder="请输入内容" v-model.trim="userdialog.info.identity">
                    <i class="el-icon-edit el-input__icon" slot="suffix">
                    </i>
                </el-input>
            </p>
            <p class="dialogp6">
                <span>*</span>
                聘用形式：
                <el-radio v-model.trim="userdialog.info.employ" label="劳动合同">劳动合同</el-radio>
                <el-radio class="radionomar" v-model.trim="userdialog.info.employ" label="劳务合同">劳务合同</el-radio>
            </p>
            <p class="dialogp6">
                <span>*</span>
                婚姻状况：
                <el-radio v-model.trim="userdialog.info.marital" label="已婚">已婚</el-radio>
                <el-radio class="radionomar" v-model.trim="userdialog.info.marital" label="未婚">未婚</el-radio>
                <el-radio class="radionomar" v-model.trim="userdialog.info.marital" label="离异">离异</el-radio>
            </p>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="userdialog.dialogFormVisible = false" v-if="userdialog.dialogTitle=='新增员工资料'||'编辑员工资料'">取消</el-button>
            <el-button type="danger" @click="Del(userdialog.info.id)" v-if="userdialog.dialogDelBtn=='删除'">{{userdialog.dialogDelBtn}}</el-button>
            <el-button type="primary" @click="Add(userdialog.info.id)" v-if="userdialog.dialogAddBtn=='确定'">{{userdialog.dialogAddBtn}}</el-button>
        </div>
        
        <!-- <h1>{{department}}</h1> -->
    </el-dialog>
    
</template>

<script>
export default {
    props:["userdialog"],
    data () {
        return {
            educations:[
                {
                    label:"大专"
                },
                {
                    label:"本科"
                },
                {
                    label:"研究生"
                },
                {
                    label:"博士"
                },
            ]
        }
    },
    computed: {
        department(){
            return this.$store.state.organizational.department;
        },
        position(){
            return this.$store.state.organizational.position;
        },
        competent(){
            return this.$store.state.organizational.competent;
        }
    },
    methods: {
        // 添加或修改用户信息方法
        Add(ids){
            var {name,sex,birthdate,mobile,email,provicen,political,nation,nativeplace,position,competent,department,jobid,education,school,major,entry,become,contractstart,contractend,identity,employ,marital} = this.userdialog.info
            if(name && sex && birthdate && mobile && email && provicen &&   political && nation && nativeplace && position && competent &&    department && jobid && education && school && major && entry && become     && contractstart && contractend && identity && employ && marital != "") {
                if(this.userdialog.dialogTitle=="新增员工资料"){
                    var str = "1234567890",id="";
                    for(var d=0;d<8;d++){
                    id+=str[~~(Math.random()*str.length)];
                }
                    this.userdialog.info.id=id;
                    this.$store.dispatch("USERADD",this.userdialog.info);
                }else if(this.userdialog.dialogTitle=="编辑员工资料"){
                    this.$store.dispatch("USERCHANGE",this.userdialog.info);
                }
                this.userdialog.dialogFormVisible = false;
            }else{
                    this.$message.error('数据不能为空 , 请检查是否有漏填项!');
            }
        },

        // 删除用户方法
        Del(ids){
            this.$store.dispatch("USERDEL",{id:ids});
            this.userdialog.dialogFormVisible = false;
        }
    }
};
</script>
