package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.UserRoles;
import com.app.utils.Roles;

public interface IRolesRepository extends JpaRepository<UserRoles, Long>{
	UserRoles findByRoleName(Roles roles);

	UserRoles getByRoleName(Roles role);
}
