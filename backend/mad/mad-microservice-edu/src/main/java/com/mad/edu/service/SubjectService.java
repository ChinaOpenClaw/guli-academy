package com.mad.edu.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.mad.edu.entity.Subject;
import com.mad.edu.vo.SubjectNestedVo;
import com.mad.edu.vo.SubjectVo2;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * <p>
 * 课程科目 服务类
 * </p>
 *
 * @author Helen
 * @since 2019-06-24
 */
public interface SubjectService extends IService<Subject> {

	List<String> batchImport(MultipartFile file) throws Exception;

	List<SubjectNestedVo> nestedList();

	List<SubjectVo2> nestedList2();
}
