package com.team.project.bjm;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {
    @Autowired
    CustomerDao dao;
    
    
    @RequestMapping(path="/reactTest", produces="text/plain")
    public @ResponseBody String reactTest() throws IOException {
        Path filePath = Paths.get("react-customer/src/index.js");
    return new String(Files.readAllBytes(filePath), StandardCharsets.UTF_8);
}
    /* List */
    @RequestMapping(path="/bjmCustomerList")
    public List<CustomerVo> customerList(String findStr){
        List<CustomerVo> list = dao.customerList(findStr);
        System.out.println("list.controller : "+ list);
        System.out.println("fStr.controller : "+ findStr);
        return list;
    }
    
    /* View */
    @RequestMapping(path="/customerView")
    public CustomerVo customerView(String businessNumber){
        CustomerVo vo = dao.customerView(businessNumber);

        System.out.println("Controller Vo :"+vo);
        System.out.println("Controller Vo :"+vo.getBusinessNumber());
        return vo;
    }
    /* Register */
    @RequestMapping(path="/customerRegister")
    public String customerRegister(CustomerVo vo){
        String msg = "";
        msg = dao.customerRegister(vo);
        System.out.println("Reg.Controller :"+ msg);
        return msg;
    }
    /* Delete */
    @RequestMapping(path="/customerDelete")
    public String customerDelete(CustomerVo vo){
        String msg = "";
        msg = dao.customerDelete(vo);
        return msg;
    }
    /* Modify */
    @RequestMapping(path="/customerModify")
    public String customerModify(CustomerVo vo){
        String msg ="";
        msg = dao.customerModify(vo);
        return msg;
    }
}
